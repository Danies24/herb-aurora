/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";
import { Product } from "@/types/product";
import { CLOUDINARY_BASE } from "@/constants/config";

const ProductListingPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams?.get("search") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "/api/products";
        if (searchQuery) {
          url += `?search=${encodeURIComponent(searchQuery)}`;
        }

        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");

        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  const handleClearFilters = () => {
    router.push("/products");
  };

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-herb-green">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-herb-cream pt-28">
      <div className="max-w-[110rem] mx-auto px-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-center sm:text-left">
          {searchQuery ? (
            <>
              <h1 className="w-full text-herb-green font-herbal text-2xl sm:text-lg mt-2">
                Search Results for &quot;{searchQuery}&quot;
              </h1>
              <button
                onClick={handleClearFilters}
                className="border-2 border-herb-green text-herb-green px-4 py-2 rounded-lg font-semibold transition-colors duration-300 hover:bg-herb-green hover:text-white whitespace-nowrap"
              >
                Clear Filters
              </button>
            </>
          ) : null}
        </div>

        {/* No Results */}
        {searchQuery && products.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-xl shadow-md">
            <p className="text-herb-green-light text-lg mb-4">
              No products found matching your search.
            </p>
            <button
              onClick={handleClearFilters}
              className="border-2 border-herb-green text-herb-green px-4 py-2 rounded-lg font-semibold transition-colors duration-300 hover:bg-herb-green hover:text-white"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 justify-items-center px-16 pb-16">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="bg-white shadow-lg border border-herb-green/20 rounded-2xl overflow-hidden relative transition-transform duration-200 hover:shadow-2xl mb-12 sm:mb-4 cursor-pointer flex flex-col min-h-[26rem]"
              >
                {/* Image */}
                <div className="relative w-full h-58">
                  <img
                    src={`${CLOUDINARY_BASE}${product.images[0]}`}
                    alt={product.name}
                    className="object-fill h-full w-full"
                  />
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col flex-grow">
                  {product.rank === 2 ? (
                    <p className="text-xs text-herb-green font-semibold mb-1">
                      #{product.rank} IN {product.category.toUpperCase()}
                    </p>
                  ) : null}
                  <h2 className="text-l text-herb-green font-semibold mb-1">
                    {product.name}
                  </h2>
                  <p className="text-herb-green/80 mb-1 text-sm">
                    {product.benefit}
                  </p>
                  <p className="text-base font-semibold text-black mb-3">
                    <span className="text-black font-bold text-lg mr-2">
                      ₹{product.variants[0]?.price}
                    </span>
                    {product.variants[0]?.strikedPrice && (
                      <span className="line-through text-gray-400 text-sm ">
                        ₹{product.variants[0].strikedPrice}
                      </span>
                    )}
                    <span className="text-herb-green/80 text-sm ml-2">
                      - {product.variants[0].size}
                    </span>
                  </p>
                </div>
                <div className="p-4 pt-0 mt-auto">
                  <button
                    className="w-full bg-herb-green text-white rounded-lg py-2.5 font-semibold shadow 
                       hover:bg-herb-green-light transition duration-300 cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductListingPage;
