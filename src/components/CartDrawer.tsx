/* eslint-disable @next/next/no-img-element */
"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { closeCart } from "@/redux/slices/uiSlice";
import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";
import { X, Trash, Plus, Minus } from "lucide-react";
import { CLOUDINARY_BASE } from "@/constants/config";

export default function CartDrawer() {
  const dispatch = useDispatch();
  const { isCartOpen } = useSelector((state: RootState) => state.ui);
  const { items } = useSelector((state: RootState) => state.cart);
  console.log("items", items);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  console.log("items", items);
  return (
    <Dialog.Root
      open={isCartOpen}
      onOpenChange={(open) => !open && dispatch(closeCart())}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1100]" />
        <Dialog.Content
          className="fixed right-0 top-0 z-[1200] h-full w-[420px] bg-white shadow-2xl p-5 flex flex-col
                transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                data-[state=open]:translate-x-0 data-[state=open]:opacity-100
                data-[state=closed]:translate-x-full data-[state=closed]:opacity-0"
        >
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-xl font-semibold text-herb-green">
              Your Cart
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                onClick={() => dispatch(closeCart())}
                className="p-1 rounded-full hover:bg-herb-green-light bg-herb-green"
              >
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto space-y-4">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.id + item.size}
                  className="flex items-start justify-between border-b pb-2 relative"
                >
                  <div className="flex items-start gap-3 h-24">
                    {item.image && (
                      <img
                        src={`${CLOUDINARY_BASE}${item.image}`}
                        alt={item.name}
                        className="w-24 h-full rounded-md object-cover"
                      />
                    )}
                    <div className="flex flex-col justify-between h-full">
                      <p className="font-medium text-herb-green text-sm">
                        {item.name}
                      </p>
                      <p className="text-sm text-herb-green">₹{item.price}</p>
                      <div className="flex items-center">
                        <button
                          className="px-1 py-0.5 border rounded text-herb-green"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                size: item.size,
                                quantity: item.quantity - 1,
                              })
                            )
                          }
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-herb-green mx-2">
                          {item.quantity}
                        </span>
                        <button
                          className="px-1 py-0.5 border rounded text-herb-green"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                size: item.size,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="absolute text-red-500 text-sm top-1 right-2"
                    onClick={() =>
                      dispatch(removeFromCart({ id: item.id, size: item.size }))
                    }
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-10">
                Your cart is empty.
              </p>
            )}
          </div>

          {/* Checkout */}
          {items.length > 0 && (
            <div className="border-t border-herb-green pt-4 mt-4">
              <div className="flex justify-between mb-3 font-medium">
                <span className="text-herb-green font-medium">Total</span>
                <span className="text-herb-green font-medium">₹{total}</span>
              </div>
              <button className="w-full bg-herb-green-light text-white py-3 rounded-lg hover:bg-herb-green transition font-medium">
                Proceed to Checkout
              </button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
