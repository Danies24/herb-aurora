import { NextResponse } from "next/server";
import User from "@/db/models/User.model";
import Address from "@/db/models/Address.model";
import { connectToDatabase } from "@/db/mangoose";
import { adminAuth } from "@/lib/firebase/firebaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // 1️⃣ Extract and verify the token
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token)
      return NextResponse.json(
        { error: "Missing auth token" },
        { status: 401 }
      );

    const decoded = await adminAuth.verifyIdToken(token);
    const firebaseUid = decoded.uid;
    const phone = decoded.phone_number || "";

    // 2️⃣ Parse registration data
    const { fullName, line1, line2, pincode, city, state } = await req.json();

    if (!fullName || !line1 || !pincode) {
      return NextResponse.json(
        { error: "Full name, address line 1, and pincode are required" },
        { status: 400 }
      );
    }

    // 3️⃣ Connect to MongoDB
    await connectToDatabase();

    // 4️⃣ Find or create user
    let user = await User.findOne({ firebaseUid });
    if (!user) {
      user = await User.create({
        firebaseUid,
        phone,
        fullName,
      });
    } else {
      user.fullName = fullName;
      user.phone = phone;
      await user.save();
    }

    // 5️⃣ Create default address (if none exists)
    const existingDefault = await Address.findOne({
      userId: user._id,
      isDefault: true,
    });

    let address;
    if (!existingDefault) {
      address = await Address.create({
        userId: user._id,
        fullName,
        phone,
        line1,
        line2,
        pincode,
        city: city || "",
        state: state || "",
        isDefault: true,
      });

      user.defaultAddress = address._id;
      await user.save();
    } else {
      // update existing default address
      existingDefault.fullName = fullName;
      existingDefault.phone = phone;
      existingDefault.line1 = line1;
      existingDefault.line2 = line2;
      existingDefault.pincode = pincode;
      existingDefault.city = city || "";
      existingDefault.state = state || "";
      await existingDefault.save();
      address = existingDefault;
    }

    // 6️⃣ Return profile
    return NextResponse.json({
      success: true,
      user: {
        firebaseUid: user.firebaseUid,
        fullName: user.fullName,
        phone: user.phone,
        address: {
          line1: address.line1,
          line2: address.line2,
          pincode: address.pincode,
          city: address.city,
          state: address.state,
          isDefault: address.isDefault,
        },
      },
    });
  } catch (err: any) {
    console.error("🔥 register route error:", err);
    return NextResponse.json(
      { error: "Failed to register user", details: err.message },
      { status: 500 }
    );
  }
}
