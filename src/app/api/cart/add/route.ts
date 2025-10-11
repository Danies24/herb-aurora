// src/app/api/cart/add/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/db/mangoose";
import Cart from "@/db/models/Cart.model";
import User from "@/db/models/User.model";
import { verifyFirebaseUser } from "@/lib/firebase/verifyFirebaseUser";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const firebaseUid = await verifyFirebaseUser(req);
    const user = await User.findOne({ firebaseUid });
    if (!user) throw new Error("User not found");

    const { productId, quantity, priceAtAddTime } = await req.json();

    let cart = await Cart.findOne({ userId: user._id });
    if (!cart) {
      cart = new Cart({ userId: user._id, items: [] });
    }

    const existing = cart.items.find(
      (i: any) => i.product.toString() === productId
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, priceAtAddTime });
    }

    await cart.save();
    return NextResponse.json({ success: true, cart });
  } catch (err: any) {
    console.error("Cart ADD error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
