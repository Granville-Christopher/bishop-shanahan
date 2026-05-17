import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Book from "@/models/Book";

export async function GET() {
  try {
    await connectToDatabase();
    const books = await Book.find({});
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newBook = await Book.create(body);
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create book" }, { status: 500 });
  }
}
