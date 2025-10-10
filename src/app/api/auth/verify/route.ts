import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/firebaseAdmin";
import { connectToDatabase } from "@/db/mangoose"; 
import User from "@/db/models/User.model";
import Address from "@/db/models/Address.model";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // 1️⃣ Parse request
    const { idToken } = await req.json();
    if (!idToken)
      return NextResponse.json({ error: "idToken missing" }, { status: 400 });

    // 2️⃣ Verify Firebase token
    const decoded = await adminAuth.verifyIdToken(idToken);
    const firebaseUid = decoded.uid;
    const phoneNumber = decoded.phone_number || null;

    // 3️⃣ Connect to Mongo
    await connectToDatabase();

    // 4️⃣ Check if user already exists
    const existingUser = await User.findOne({ firebaseUid });

    if (!existingUser) {
      // 🆕 New user → client will handle registration form
      return NextResponse.json({
        isNew: true,
        uid: firebaseUid,
        phoneNumber,
      });
    }

    // 5️⃣ Existing user → get their default address
    const defaultAddress = await Address.findOne({
      userId: existingUser._id,
      isDefault: true,
    });

    // 6️⃣ Prepare profile data
    const profile = {
      fullName: existingUser.fullName || "",
      phone: existingUser.phone || phoneNumber,
      address: defaultAddress
        ? {
            line1: defaultAddress.line1,
            line2: defaultAddress.line2,
            pincode: defaultAddress.pincode,
            city: defaultAddress.city,
            state: defaultAddress.state,
          }
        : null,
    };

    // 7️⃣ Respond with user info
    return NextResponse.json({
      isNew: false,
      profile,
    });
  } catch (err: any) {
    console.error("🔥 verify route error:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
