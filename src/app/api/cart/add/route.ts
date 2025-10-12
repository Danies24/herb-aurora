// src/app/api/cart/add/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/db/mangoose";
import Cart, { ICartItem } from "@/db/models/Cart.model";
import User from "@/db/models/User.model";
import { verifyFirebaseUser } from "@/lib/firebase/verifyFirebaseUser";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const firebaseUid = await verifyFirebaseUser(req);
    const user = await User.findOne({ firebaseUid });
    if (!user) throw new Error("User not found");

    const { id: productId, quantity, price } = await req.json();

    let cart = await Cart.findOne({ userId: user._id });
    if (!cart) {
      cart = new Cart({ userId: user._id, items: [] });
    }

    const existing = cart.items.find(
      (i: ICartItem) => i.product.toString() === productId
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, priceAtAddTime: price });
    }

    await cart.save();
    await cart.populate({
      path: "items.product",
      select: "name images variants",
    });
    return NextResponse.json({ success: true, cart });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Cart ADD error:", err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    console.error("Cart ADD unknown error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
