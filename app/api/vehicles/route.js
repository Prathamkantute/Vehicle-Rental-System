import { connectToDatabase } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const [rows] = await db.query("SELECT * FROM vehicles");
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch vehicles" }, { status: 500 });
  }
}
