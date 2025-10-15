// src/app/api/cart/remove/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/db/mangoose";
import Cart, { ICartItem } from "@/db/models/Cart.model";
import User from "@/db/models/User.model";
import { verifyFirebaseUser } from "@/lib/firebase/verifyFirebaseUser";
import { handleApiError } from "@/utlls/handleError";

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const firebaseUid = await verifyFirebaseUser(req);
    const user = await User.findOne({ firebaseUid });
    if (!user) throw new Error("User not found");

    const { productId } = await req.json();

    const cart = await Cart.findOne({ userId: user._id });
    if (!cart)
      return NextResponse.json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(
      (item: ICartItem) => item.product.toString() !== productId
    );

    await cart.save();

    return NextResponse.json({ success: true, cart });
  } catch (err: unknown) {
    const handled = handleApiError(err, "Cart REMOVE error");
    return NextResponse.json(handled, { status: 500 });
  }
}
