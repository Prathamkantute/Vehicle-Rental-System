import { connectToDatabase } from "../../../lib/db";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const db = await connectToDatabase();

    // Query MySQL for the user
    const [rows] = await db.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
    }

    const user = rows[0];

    // ✅ Include username and role in JWT
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
