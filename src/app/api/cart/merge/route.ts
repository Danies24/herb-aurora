// src/app/api/cart/merge/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/db/mangoose";
import Cart from "@/db/models/Cart.model";
import User from "@/db/models/User.model";
import { verifyFirebaseUser } from "@/lib/firebase/verifyFirebaseUser";
import { handleApiError } from "@/utlls/handleError";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const firebaseUid = await verifyFirebaseUser(req);
    const user = await User.findOne({ firebaseUid });
    if (!user) throw new Error("User not found");

    const guestCart = await req.json(); // [{ id, quantity, priceAtAddTime }]

    let cart = await Cart.findOne({ userId: user._id });
    if (!cart) cart = new Cart({ userId: user._id, items: [] });

    for (const item of guestCart) {
      const existing = cart.items.find(
        (i: any) => i.product.toString() === item.id
      );
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        cart.items.push({
          product: item.id,
          quantity: item.quantity,
          priceAtAddTime: item.priceAtAddTime || item.price,
        });
      }
    }

    await cart.save();
    return NextResponse.json({ success: true, cart });
  } catch (err: unknown) {
    const handled = handleApiError(err, "Cart Merge");
    return NextResponse.json(handled, { status: 500 });
  }
}
