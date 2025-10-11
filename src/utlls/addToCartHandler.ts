import { AppDispatch } from "@/redux/store";
import { addToCart, setCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";

export interface AddToCartPayload {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  size?: string;
  image?: string;
}

export const addToCartHandler = async (
  product: AddToCartPayload,
  dispatch: AppDispatch,
  isLoggedIn: boolean,
  token?: string
) => {
  const item = { ...product, quantity: product.quantity ?? 1 };

  // 🧍 Guest user → Only Redux + localStorage
  if (!isLoggedIn) {
    dispatch(addToCart(item));
    toast.success("Added to cart 🛒");
    return;
  }

  // 👤 Logged-in user → Call API
  try {
    const res = await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: product.id,
        quantity: product.quantity ?? 1,
        price: product.price,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to add to cart");

    // ✅ Sync Redux with backend cart items
    dispatch(setCart(data.items));
    toast.success("Added to cart 🛍️");
  } catch (err: any) {
    toast.error(err.message || "Failed to add item");
  }
};
