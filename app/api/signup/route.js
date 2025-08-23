import { connectToDatabase } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const db = await connectToDatabase();

    // check if username exists
    const [existing] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    if (existing.length > 0) {
      return NextResponse.json({ message: "Username already exists" }, { status: 400 });
    }

    // insert new user (default role = customer)
    await db.query("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [username, password, "customer"]);

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
