import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Volunteer from "@/models/Volunteer";

export async function GET() {
  try {
    await connectToDatabase();
    const volunteers = await Volunteer.find({}).sort({ createdAt: -1 });
    return NextResponse.json(volunteers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch volunteers" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newVolunteer = await Volunteer.create(body);
    return NextResponse.json(newVolunteer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to apply" }, { status: 500 });
  }
}
