import { connectToDatabase } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { username, password, email, phone_number, role } = await req.json();
    const db = await connectToDatabase();

    // check if username exists in both users and admins
    const [userExists] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    const [adminExists] = await db.query("SELECT * FROM admins WHERE username = ?", [username]);
    if (userExists.length > 0 || adminExists.length > 0) {
      return NextResponse.json({ message: "Username already exists" }, { status: 400 });
    }

    // If role is admin, do not require email/phone, else require for users
    if (role === "admin") {
      await db.query("INSERT INTO admins (admin_id, name, username) VALUES (UUID(), ?, ?)", [username, username]);
      return NextResponse.json({ message: "Admin created successfully" }, { status: 201 });
    } else {
      if (!email || !phone_number) {
        return NextResponse.json({ message: "Email and phone number are required for users" }, { status: 400 });
      }
      await db.query(
        "INSERT INTO users (username, password, role, email, phone_number) VALUES (?, ?, ?, ?, ?)",
        [username, password, role || "customer", email, phone_number]
      );
      return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
