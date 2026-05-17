import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Newsletter from "@/models/Newsletter";

export async function GET() {
  try {
    await connectToDatabase();
    const subs = await Newsletter.find({}).sort({ createdAt: -1 });
    return NextResponse.json(subs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    await connectToDatabase();
    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Already subscribed!" }, { status: 200 });
    }
    const newSub = await Newsletter.create({ email });
    return NextResponse.json(newSub, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
