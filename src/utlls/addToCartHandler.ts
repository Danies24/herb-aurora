import { AppDispatch, store } from "@/redux/store";
import { addToCart, setCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import { Product } from "@/types/product";
import { handleClientError } from "./handleError";
import { CartItemFromApi } from "./cartMapper";

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

    const transformed = data.cart.items.map((item: CartItemFromApi) => ({
      id: item.product._id,
      name: item.product.name,
      price: item.priceAtAddTime,
      quantity: item.quantity,
      size: item.product.variants?.[0]?.size || "Standard",
      image: item.product.images?.[0] || "",
    }));

    dispatch(setCart(transformed));
    toast.success("Added to cart 🛍️");
  } catch (err: unknown) {
    handleClientError(err, "Failed to add cart !!");
  }
};
