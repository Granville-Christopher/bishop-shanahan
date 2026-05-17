import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Event from "@/models/Event";

export async function GET() {
  try {
    await connectToDatabase();
    const events = await Event.find({});
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newEvent = await Event.create(body);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
