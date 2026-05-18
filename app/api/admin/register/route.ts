import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    // Check if an admin already exists
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      return NextResponse.json(
        { error: "An admin account already exists. Only one admin is allowed." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create admin
    const newAdmin = await Admin.create({
      email,
      passwordHash,
    });

    return NextResponse.json(
      { message: "Admin account created successfully", adminId: newAdmin._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { error: "Failed to create admin account" },
      { status: 500 }
    );
  }
}
