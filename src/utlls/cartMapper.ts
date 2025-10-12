import { CartItem } from "@/redux/slices/cartSlice";

export interface CartItemFromApi {
  product: {
    _id: string;
    name: string;
    images: string[];
    variants?: { size?: string }[];
  };
  quantity: number;
  priceAtAddTime: number;
}

export const transformCartItems = (apiItems: CartItemFromApi[]): CartItem[] =>
  apiItems.map((item) => ({
    id: item.product._id,
    name: item.product.name,
    price: item.priceAtAddTime,
    quantity: item.quantity,
    size: item.product.variants?.[0]?.size || "Standard",
    image: item.product.images?.[0] || "",
  }));
