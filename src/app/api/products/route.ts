import { NextResponse } from "next/server";
import { connectToDatabase } from "@/db/mangoose";
import Product from "@/db/models/Products.model";

// ✅ GET all products
export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find().lean();
    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
