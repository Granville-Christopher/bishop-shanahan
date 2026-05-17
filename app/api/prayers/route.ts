import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import PrayerRequest from "@/models/PrayerRequest";

export async function GET() {
  try {
    await connectToDatabase();
    const prayers = await PrayerRequest.find({}).sort({ createdAt: -1 });
    return NextResponse.json(prayers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch prayer requests" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newPrayer = await PrayerRequest.create(body);
    return NextResponse.json(newPrayer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit prayer request" }, { status: 500 });
  }
}
