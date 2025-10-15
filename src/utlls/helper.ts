import { auth } from "@/lib/firebase/firebase";
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

export async function authorizedFetch(url: string, options: RequestInit = {}) {
  const user = auth.currentUser;
  const freshToken = user ? await user.getIdToken() : null;

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${freshToken}`,
    },
  });
}

export function mapDBCartToReduxItems(dbItems: CartItemFromApi[]): CartItem[] {
  return dbItems.map((item) => ({
    id: item.product._id,
    name: item.product.name,
    price: item.priceAtAddTime || 0,
    quantity: item.quantity,
    size: item.product.variants?.[0]?.size || undefined,
    image: item.product.images?.[0] || undefined,
  }));
}
