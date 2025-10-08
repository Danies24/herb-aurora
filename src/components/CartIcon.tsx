"use client";

import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store"; // make sure your store is exported

const CartIcon = () => {
  // Grab cart items from Redux
  const items = useSelector((state: RootState) => state.cart.items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative inline-flex items-center justify-center no-underline">
      <div className="relative p-2 rounded-md transition-colors hover:bg-herb-green/10">
        <ShoppingCart className="w-6 h-6 text-herb-green-light transition-colors hover:text-herb-green" />
        {itemCount > 0 && (
          <span
            className="absolute top-0 right-0 flex items-center justify-center min-w-[1.25rem] h-[1.25rem] rounded-full
                       bg-herb-green text-white text-[0.75rem] font-semibold leading-none shadow-md
                       transform translate-x-1/4 -translate-y-1/4 sm:min-w-[1rem] sm:h-[1rem] sm:text-[0.625rem]"
          >
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default CartIcon;
