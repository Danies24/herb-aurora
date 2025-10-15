import { AppDispatch, store } from "@/redux/store";
import { addToCart, setCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import { Product } from "@/types/product";
import { handleClientError } from "./handleError";
import { mapDBCartToReduxItems } from "./helper";

export const addToCartHandler = async (
  product: Product,
  dispatch: AppDispatch
) => {
  try {
    const { auth } = store.getState();
    const { isLoggedIn, token } = auth;
    const cartParams = {
      id: product._id,
      name: product.name,
      price: product.variants[0].price,
      quantity: 1,
      size: product.variants[0].size,
      image: product.images[0],
    };

    if (!isLoggedIn) {
      dispatch(addToCart(cartParams));
      toast.success("Added to cart 🛍️");
      return;
    }

    const res = await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cartParams),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to add to cart");

    dispatch(setCart(mapDBCartToReduxItems(data.cart.items)));
    toast.success("Added to cart 🛍️");
  } catch (err: unknown) {
    handleClientError(err, "Failed to add cart !!");
  }
};
