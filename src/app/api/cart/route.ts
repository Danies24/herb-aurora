// src/app/api/cart/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/db/mangoose";
import Cart from "@/db/models/Cart.model";
import User from "@/db/models/User.model";
import { verifyFirebaseUser } from "@/lib/firebase/verifyFirebaseUser";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const firebaseUid = await verifyFirebaseUser(req);

    const user = await User.findOne({ firebaseUid });
    if (!user) return NextResponse.json({ items: [] });

    const cart = await Cart.findOne({ userId: user._id }).populate(
      "items.product"
    );
    return NextResponse.json(cart ? cart.items : []);
  } catch (err: any) {
    console.error("Cart GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
