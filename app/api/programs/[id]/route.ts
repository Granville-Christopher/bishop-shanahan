import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Program from "@/models/Program";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectToDatabase();
    const updatedProgram = await Program.findByIdAndUpdate(id, body, { new: true });
    if (!updatedProgram) return NextResponse.json({ error: "Program not found" }, { status: 404 });
    return NextResponse.json(updatedProgram);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update program" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const deletedProgram = await Program.findByIdAndDelete(id);
    if (!deletedProgram) return NextResponse.json({ error: "Program not found" }, { status: 404 });
    return NextResponse.json({ message: "Program deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete program" }, { status: 500 });
  }
}
