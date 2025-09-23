/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // adjust path to your store
import { addToCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import { Product } from "@/types/product";

const CLOUDINARY_BASE =
  "https://res.cloudinary.com/dc5qdjy55/image/upload/products/";

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
  const dispatch = useDispatch();

  // ✅ Access cart items from Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Helper: is product already in cart?
  const isInCart = (productId: string, size: string) => {
    return cartItems.some(
      (item) => item.id === productId && item.size === size
    );
  };

  // Add to cart
  const handleAddToCart = (product: Product) => {
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
                className="relative bg-white rounded-lg overflow-hidden shadow-md cursor-pointer transition transform hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Product Image */}
                <div className="relative w-full h-54 flex items-center justify-center">
                  <img
                    src={`${CLOUDINARY_BASE}${product.images[0]}`}
                    alt={product.name}
                    className="object-fill h-full w-full"
                    loading={lazyLoading ? "lazy" : "eager"}
                  />
                </div>

                {/* Product Details */}
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

                  {/* CTA Button */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();

                      // ✅ If login required (Magic Checkout), check user state
                      // For now: always allow
                      if (inCart) {
                        handleGoToBag();
                      } else {
                        handleAddToCart(product);
                      }
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
