import { NextResponse } from "next/server";
import { connectToDatabase } from "@/db/mangoose";
import Testimonial from "@/db/models/Testimonials.model";

// GET all testimonials
export async function GET() {
  try {
    await connectToDatabase();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 }); // newest first
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error("❌ Error fetching testimonials:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// POST a new testimonial (optional)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();

    const newTestimonial = await Testimonial.create(body);

    return NextResponse.json({ success: true, data: newTestimonial });
  } catch (error) {
    console.error("❌ Error creating testimonial:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
