import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Program from "@/models/Program";

export async function GET() {
  try {
    await connectToDatabase();
    const programs = await Program.find({});
    return NextResponse.json(programs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newProgram = await Program.create(body);
    return NextResponse.json(newProgram, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create program" }, { status: 500 });
  }
}
