import { NextResponse } from "next/server";
import { connectToDatabase } from "@/db/mangoose";
import Cart, { ICartItem } from "@/db/models/Cart.model";
import User from "@/db/models/User.model";
import { verifyFirebaseUser } from "@/lib/firebase/verifyFirebaseUser";
import { handleApiError } from "@/utlls/handleError";

export async function PATCH(req: Request) {
  try {
    await connectToDatabase();
    const firebaseUid = await verifyFirebaseUser(req);
    const user = await User.findOne({ firebaseUid });
    if (!user) throw new Error("User not found");

    const { productId, quantity } = await req.json();

    const cart = await Cart.findOne({ userId: user._id });
    if (!cart) throw new Error("Cart not found");

    const item = cart.items.find(
      (i: ICartItem) => i.product.toString() === productId
    );
    if (!item) throw new Error("Product not in cart");

    item.quantity = quantity;
    await cart.save();

    return NextResponse.json({ success: true, cart });
  } catch (err: unknown) {
    const handled = handleApiError(err, "Cart UPDATE error");
    return NextResponse.json(handled, { status: 500 });
  }
}
