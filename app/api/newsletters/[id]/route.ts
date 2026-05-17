import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Newsletter from "@/models/Newsletter";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const deleted = await Newsletter.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Subscriber not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
