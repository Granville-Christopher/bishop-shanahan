import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Book from "@/models/Book";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectToDatabase();
    const updatedBook = await Book.findByIdAndUpdate(id, body, { new: true });
    if (!updatedBook) return NextResponse.json({ error: "Book not found" }, { status: 404 });
    return NextResponse.json(updatedBook);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update book" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) return NextResponse.json({ error: "Book not found" }, { status: 404 });
    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 });
  }
}
