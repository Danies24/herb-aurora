/* eslint-disable @next/next/no-img-element */
"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { closeCart, openLogin } from "@/redux/slices/uiSlice";
import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";
import {
  X,
  Trash,
  Plus,
  Minus,
  MapPin,
  User,
  Phone,
  Home,
  ShoppingBag,
} from "lucide-react";
import { CLOUDINARY_BASE } from "@/constants/config";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CartDrawer() {
  const dispatch = useDispatch();
  const { isCartOpen } = useSelector((state: RootState) => state.ui);
  const { items } = useSelector((state: RootState) => state.cart);
  const [step, setStep] = useState<"cart" | "address">("cart");
  const [showAddForm, setShowAddForm] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const isLoggedIn = true;
  const delivery = 50;
  const grandTotal = total + delivery;

  const resetStates = () => {
    setStep("cart");
    setShowAddForm(false);
  };

  const handleCheckout = () => {
    if (isLoggedIn) {
      setStep("address");
    } else {
      dispatch(closeCart());
      dispatch(openLogin());
    }
  };

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
              {step === "cart" ? "Your Cart" : "Checkout"}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                onClick={() => {
                  dispatch(closeCart());
                  resetStates();
                }}
                className="p-1 rounded-full hover:bg-herb-green-light bg-herb-green"
              >
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          {step === "cart" && (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto pr-1 pb-10 space-y-4">
                {items.length > 0 ? (
                  items.map((item) => (
                    <div
                      key={item.id + item.size}
                      className="group relative flex items-start gap-3 p-3 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:border-herb-green"
                    >
                      {/* Product Image */}
                      <div className="relative">
                        {item.image && (
                          <img
                            src={`${CLOUDINARY_BASE}${item.image}`}
                            alt={item.name}
                            className="w-24 h-24 rounded-lg object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                          />
                        )}
                        <button
                          onClick={() =>
                            dispatch(
                              removeFromCart({ id: item.id, size: item.size })
                            )
                          }
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                        >
                          <Trash size={14} />
                        </button>
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <p className="font-semibold text-herb-green text-sm mb-1">
                            {item.name}
                          </p>
                          <p className="text-gray-600 text-xs mb-2">
                            Size:{" "}
                            <span className="text-herb-green font-medium">
                              {item.size || "Standard"}
                            </span>
                          </p>
                        </div>

                        {/* Quantity & Price */}
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center bg-herb-green/10 rounded-full px-2 py-1">
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    size: item.size,
                                    quantity: Math.max(1, item.quantity - 1),
                                  })
                                )
                              }
                              className="p-1 rounded-full hover:bg-herb-green/20 transition"
                            >
                              <Minus size={16} className="text-herb-green" />
                            </button>
                            <span className="mx-2 w-5 text-center font-medium text-herb-green transition-all duration-300">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    size: item.size,
                                    quantity: item.quantity + 1,
                                  })
                                )
                              }
                              className="p-1 rounded-full hover:bg-herb-green/20 transition"
                            >
                              <Plus size={16} className="text-herb-green" />
                            </button>
                          </div>

                          <p className="font-semibold text-herb-green">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-10 text-gray-500">
                    <ShoppingBag
                      size={40}
                      className="text-herb-green opacity-80"
                    />
                    <p className="text-sm">Your cart is empty.</p>
                    <p className="text-xs text-herb-green mt-1">
                      Start adding your favorites ✨
                    </p>
                  </div>
                )}
              </div>

              {/* Checkout Footer */}
              {items.length > 0 && (
                <div className="sticky bottom-0 bg-white border-t border-herb-green pt-4 pb-5 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between mb-3 font-medium">
                    <span className="text-herb-green font-medium">Total</span>
                    <span className="text-herb-green font-medium">
                      ₹{total}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-herb-green-light text-white py-3 rounded-lg font-medium hover:bg-herb-green transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <span className="animate-pulse">→</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {step === "address" && (
            <div className="flex flex-col h-full">
              {/* Scrollable Middle Section */}
              <div className="flex-1 overflow-y-auto pr-1 pb-10 space-y-4">
                {/* Total Order Summary */}
                <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
                  <p className="text-lg font-semibold text-herb-green mb-2">
                    Total Order Summary
                  </p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Products Amount</span>
                      <span>₹{total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Amount</span>
                      <span>₹{delivery}</span>
                    </div>
                    <div className="flex justify-between font-medium text-herb-green">
                      <span>Total Amount</span>
                      <span>₹{grandTotal}</span>
                    </div>
                  </div>
                </div>

                {/* Addresses */}
                <p className="text-herb-green font-semibold">Addresses</p>

                <div id="address-list" className="space-y-3">
                  <div className="border border-herb-green rounded-xl p-3 shadow-sm cursor-pointer bg-herb-green/5 hover:bg-herb-green/10 transition">
                    <div className="flex items-center gap-2 text-herb-green font-medium mb-1">
                      <User size={16} /> Danies Mohamed
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <MapPin size={16} className="mt-[2px]" />
                      <p>142/2, Bethany Mansion, Bangalore, 560035</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Phone size={16} /> +91 9876543210
                    </div>
                    <p className="text-xs text-herb-green mt-1 font-medium">
                      ✅ Selected
                    </p>
                  </div>

                  <div className="border border-gray-300 rounded-xl p-3 shadow-sm cursor-pointer hover:border-herb-green transition">
                    <div className="flex items-center gap-2 text-herb-green font-medium mb-1">
                      <User size={16} /> Bhavi
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <MapPin size={16} className="mt-[2px]" />
                      <p>15, Nehruji Street, Sattur, 626203</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Phone size={16} /> +91 8248365777
                    </div>
                  </div>

                  {/* Add / New Address Form */}
                  {showAddForm ? (
                    <div
                      id="add-address-form"
                      className="border border-herb-green rounded-xl p-4 bg-herb-green/5 mt-3 space-y-3 shadow-sm animate-in fade-in-50"
                    >
                      <p className="text-herb-green font-semibold text-base flex items-center gap-2 mb-2">
                        <Home size={18} /> Add New Address
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-herb-green transition">
                          <User size={16} className="text-herb-green" />
                          <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full outline-none text-sm text-gray-700 bg-transparent"
                          />
                        </div>

                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-herb-green transition">
                          <MapPin size={16} className="text-herb-green" />
                          <input
                            type="text"
                            placeholder="Address Line 1 (Street / Door No)"
                            className="w-full outline-none text-sm text-gray-700 bg-transparent"
                          />
                        </div>

                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-herb-green transition">
                          <MapPin size={16} className="text-herb-green" />
                          <input
                            type="text"
                            placeholder="Address Line 2 (Area / Landmark)"
                            className="w-full outline-none text-sm text-gray-700 bg-transparent"
                          />
                        </div>

                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-herb-green transition">
                          <MapPin size={16} className="text-herb-green" />
                          <input
                            type="text"
                            placeholder="Pincode"
                            maxLength={6}
                            className="w-full outline-none text-sm text-gray-700 bg-transparent"
                          />
                        </div>

                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-herb-green transition">
                          <Phone size={16} className="text-herb-green" />
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            maxLength={10}
                            className="w-full outline-none text-sm text-gray-700 bg-transparent"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => {
                            toast.success("New address added ✨");
                            setShowAddForm(false);
                            document
                              .getElementById("address-list")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="flex-1 bg-herb-green text-white py-2.5 rounded-lg hover:bg-herb-green-light font-medium transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setShowAddForm(false);
                            document
                              .getElementById("address-list")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="flex-1 border border-herb-green text-herb-green py-2.5 rounded-lg hover:bg-herb-green/10 font-medium transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setShowAddForm(true);
                        setTimeout(() => {
                          document
                            .getElementById("add-address-form")
                            ?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                        }, 100);
                      }}
                      className="w-full border-2 border-dashed border-herb-green text-herb-green py-3 rounded-xl font-medium hover:bg-herb-green/10 transition"
                    >
                      + Add New Address
                    </button>
                  )}
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="sticky bottom-0 bg-white border-t border-herb-green pt-4 pb-5 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between mb-3 font-medium">
                  <span className="text-herb-green font-medium">Total</span>
                  <span className="text-herb-green font-medium">
                    ₹{grandTotal}
                  </span>
                </div>
                <button
                  // disabled={showAddForm}
                  onClick={() => toast.success("Proceeding to payment 💳")}
                  className="w-full bg-herb-green-light text-white py-3 rounded-lg hover:bg-herb-green transition font-medium"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
