/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // adjust path to your store
import { Product } from "@/types/product";
import { CLOUDINARY_BASE } from "@/constants/config";
import { openCart } from "@/redux/slices/uiSlice";
import { addToCartHandler } from "@/utlls/addToCartHandler";

type ProductSectionProps = {
  title: string;
  subTitle: string;
  products: Product[];
  lazyLoading: boolean;
};

const ProductSection = ({ title, subTitle, products }: ProductSectionProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ Access cart items from Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Helper: is product already in cart?
  const isInCart = (productId: string, size: string) => {
    return cartItems?.some(
      (item) => item.id === productId && item.size === size
    );
  };

  // Add to cart
  const handleAddToCart = (product: Product) => {
    addToCartHandler(product, dispatch);
  };

  const handleGoToBag = () => {
    dispatch(openCart());
  };

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };
  return (
    <section className="py-16 bg-herb-cream w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-3xl font-bold text-herb-green-light text-center mb-2 [font-family:var(--font-herbal)]">
          {title}
        </h2>
        <p className="text-center text-herb-green-light opacity-80 mb-12">
          {subTitle}
        </p>

        {/* Product Grid */}
        <div
          className="grid gap-8 p-12 
             grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
             justify-items-center"
        >
          {products.map((product) => {
            const inCart = isInCart(product.id, product.variants[0].size);

            return (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="bg-white shadow-lg border border-herb-green/20 rounded-2xl overflow-hidden relative transition-transform duration-200 mb-12 sm:mb-4 cursor-pointer flex flex-col min-h-[26rem]"
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
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (inCart) {
                        handleGoToBag();
                      } else {
                        handleAddToCart(product);
                      }
                    }}
                    className={`
  w-full rounded-lg py-2.5 text-lg font-bold text-white shadow cursor-pointer
  ${
    inCart
      ? "bg-herb-green hover:bg-herb-green-light"
      : "bg-herb-green-light hover:bg-herb-green"
  }
`}
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
