import { store } from "@/redux/store";
import { setCart } from "@/redux/slices/cartSlice";

export async function syncCartAfterLogin(token: string) {
  const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
  if (!localCart.length) return;

  const res = await fetch("/api/cart/merge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(localCart),
  });

  const data = await res.json();
  if (data.success) {
    store.dispatch(setCart(data.cart.items));
    localStorage.removeItem("cart");
  }
}
