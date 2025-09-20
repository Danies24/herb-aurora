"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/constants/products";
import { useLoginRequired } from "@/hooks/useLoginRequired";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";

type ProductSectionProps = {
  title: string;
  subTitle: string;
  products: Product[];
  lazyLoading: boolean;
};

const ProductSection = ({
  title,
  subTitle,
  products,
  lazyLoading,
}: ProductSectionProps) => {
  const router = useRouter();
  const loginRequired = useLoginRequired();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const isInCart = (productId: string, size: string) => {
    return cartItems.some(
      (item) => item.id === productId && item.size === size
    );
  };

  const handleAddToCart = async (product: Product) => {
    try {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.variants[0].price,
          quantity: 1,
          size: product.variants[0].size,
          image: product.images[0],
        })
      );
      toast.success("Added to your cart!");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const handleGoToBag = () => {
    router.push("/cart");
  };

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <section className="py-16 bg-herb-cream w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-herb-green-light text-center mb-2 font-[var(--font-herbal)]">
          {title}
        </h2>
        <p className="text-center text-herb-green-light opacity-80 mb-12">
          {subTitle}
        </p>

        <div className="flex overflow-x-auto gap-4 px-1 py-2 scroll-snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 sm:overflow-visible sm:snap-none">
          {products.map((product) => {
            const inCart = isInCart(product.id, product.variants[0].size);

            return (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="relative bg-white rounded-lg overflow-hidden shadow-md cursor-pointer transition transform hover:-translate-y-1 hover:shadow-lg snap-start flex-shrink-0 w-2/3 sm:w-auto"
              >
                <div className="relative w-full h-72">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    loading={lazyLoading ? "lazy" : "eager"}
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold text-herb-green-light mb-1">
                    #{product.rank} IN {product.category.toUpperCase()}
                  </p>
                  <h3 className="font-[var(--font-herbal)] text-base text-herb-green-light mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-herb-green-light/80 mb-2">
                    {product.benefit}
                  </p>
                  <p className="text-sm text-herb-green-light/80 mb-2">
                    {product.variants[0].size}
                  </p>
                  <p className="text-base font-semibold text-herb-green-light mb-4">
                    {product.variants[0].strikedPrice && (
                      <span className="text-gray-400 line-through mr-2">
                        ₹{product.variants[0].strikedPrice}
                      </span>
                    )}
                    <span className="text-black font-bold text-lg">
                      ₹{product.variants[0].price}
                    </span>
                  </p>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      loginRequired(() => {
                        if (inCart) {
                          handleGoToBag();
                        } else {
                          handleAddToCart(product);
                        }
                      });
                    }}
                    disabled={inCart}
                    className={`w-full py-3 rounded-lg font-[var(--font-herbal)] transition text-white ${
                      inCart
                        ? "bg-herb-green hover:bg-herb-green-light font-bold text-lg"
                        : "bg-herb-green-light hover:bg-herb-green"
                    }`}
                  >
                    {inCart ? "Go to Bag" : "Add to Cart"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
