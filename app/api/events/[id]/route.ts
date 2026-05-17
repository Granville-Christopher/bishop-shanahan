import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Event from "@/models/Event";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectToDatabase();
    const updatedEvent = await Event.findByIdAndUpdate(id, body, { new: true });
    if (!updatedEvent) return NextResponse.json({ error: "Event not found" }, { status: 404 });
    return NextResponse.json(updatedEvent);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) return NextResponse.json({ error: "Event not found" }, { status: 404 });
    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
