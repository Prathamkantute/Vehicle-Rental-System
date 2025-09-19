import { connectToDatabase } from "../../../lib/db";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const db = await connectToDatabase();

    // First, check if admin exists
    const [adminRows] = await db.query(
      "SELECT * FROM admins WHERE username = ? AND password = ?",
      [username, password]
    );
    if (adminRows.length > 0) {
      const admin = adminRows[0];
      const token = jwt.sign(
        { username: admin.username, role: "admin" },
        process.env.JWT_SECRET || "mysecret",
        { expiresIn: "1d" }
      );
      return new Response(JSON.stringify({ token, role: "admin" }), { status: 200 });
    }

    // Otherwise, check users table
    const [userRows] = await db.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );
    if (userRows.length === 0) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
    }
    const user = userRows[0];
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET || "mysecret",
      { expiresIn: "1d" }
    );
    return new Response(JSON.stringify({ token, role: user.role }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
}
