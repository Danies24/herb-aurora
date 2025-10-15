/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { CartItem } from "@/redux/slices/cartSlice";
import Footer from "@/components/Footer";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Product } from "@/types/product";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CLOUDINARY_BASE } from "@/constants/config";
import { addToCartHandler } from "@/utlls/addToCartHandler";

const ProductDetailsPage = () => {
  const params = useParams();
  const id = params?.productId as string;

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Product not found");
        const data: Product = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-herb-cream">
        <p className="text-herb-green">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-herb-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-herbal text-herb-green mb-4">
            Product not found
          </h2>
          <Link
            href="/products"
            className="text-herb-green font-semibold hover:text-herb-green-light transition"
          >
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  const isInCart = cartItems?.some(
    (item: CartItem) =>
      item.id === product.id &&
      item.size === product.variants[selectedVariant].size
  );

  const handleCartButtonClick = async () => {
    addToCartHandler(product, dispatch);
  };

  return (
    <div className="min-h-screen bg-herb-cream pt-32">
      <div className="max-w-[100rem] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Carousel */}
          <div className="relative h-[50vh] md:h-[70vh] rounded-2xl shadow-xl overflow-hidden">
            <div
              className="w-full h-full relative overflow-hidden"
              ref={emblaRef}
            >
              <div className="flex h-full">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-full h-full flex-[0_0_100%]"
                  >
                    <img
                      src={`${CLOUDINARY_BASE}${img}`}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Nav buttons */}
            <button
              onClick={scrollPrev}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-herb-green-light text-white p-2 rounded-full shadow hover:bg-herb-green transition"
            >
              <IoIosArrowBack size={28} />
            </button>
            <button
              onClick={scrollNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-herb-green-light text-white p-2 rounded-full shadow hover:bg-herb-green transition"
            >
              <IoIosArrowForward size={28} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                  className={`w-3 h-3 rounded-full ${
                    selectedIndex === idx
                      ? "bg-white scale-125 shadow"
                      : "bg-white/50"
                  } transition`}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6 bg-white/50 backdrop-blur-md rounded-2xl shadow-xl p-8 animate-fadeInUp">
            <div>
              <h1 className="text-xl md:text-3xl font-herbal text-herb-green mb-1">
                {product.name}
              </h1>
              <p className="italic text-herb-green">{product.target}</p>
            </div>

            {/* Sizes */}
            <div>
              <h2 className="text-xl font-herbal text-herb-green mb-2">
                Select Quantity
              </h2>
              <div className="flex gap-3">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(index)}
                    className={`px-4 py-2 rounded-lg border-2 font-semibold transition shadow-sm ${
                      selectedVariant === index
                        ? "bg-herb-green-light text-white border-herb-green"
                        : "bg-white text-herb-green border-herb-green hover:bg-herb-green hover:text-white"
                    }`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="bg-herb-green-light p-4 rounded-lg shadow">
              <h2 className="text-xl font-herbal text-white mb-2">
                Price Details
              </h2>
              <div className="flex justify-between text-white mb-2">
                <span>Selected Size:</span>
                <span>{product.variants[selectedVariant].size}</span>
              </div>
              <div className="flex justify-between text-white mb-2">
                <span>Weight:</span>
                <span>{product.variants[selectedVariant].weight}</span>
              </div>
              <div className="flex justify-between text-white border-t border-white pt-2">
                <span>Total Price:</span>
                <span className="font-bold text-lg">
                  ₹{product.variants[selectedVariant].price}
                </span>
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => handleCartButtonClick()}
              className={`w-full rounded-xl py-3 font-bold shadow-lg transition transform ${
                isInCart
                  ? "bg-herb-green text-white hover:bg-herb-green-light"
                  : "bg-herb-green-light text-white hover:bg-herb-green"
              }`}
              disabled={isInCart}
            >
              {isInCart ? "Go to Bag" : "Add to Cart"}
            </button>

            {/* Description */}
            <div>
              <h2 className="text-xl font-herbal text-herb-green">
                Description
              </h2>
              <p className="text-herb-green">{product.description}</p>
            </div>
            <div>
              <h2 className="text-xl font-herbal text-herb-green">Benefits</h2>
              <p className="text-herb-green">{product.benefit}</p>
            </div>
            <div>
              <h2 className="text-xl font-herbal text-herb-green">
                Key Ingredients
              </h2>
              <p className="text-herb-green">{product.ingredients}</p>
            </div>

            <div>
              <h2 className="text-xl font-herbal text-herb-green">
                How to Use
              </h2>
              <p className="text-herb-green">{product.usage}</p>
            </div>

            {product.features && (
              <div>
                <h2 className="text-xl font-herbal text-herb-green">
                  Features
                </h2>
                <ul className="list-disc list-inside text-herb-green">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
