import { connectToDatabase } from "../../../../lib/db";
import { NextResponse } from "next/server";

// Helper to log admin actions
async function logAdminAction(admin_id, action, entry_type) {
  const db = await connectToDatabase();
  await db.query(
    "INSERT INTO admin_activity_logs (admin_id, action, entry_type, action_timestamp) VALUES (?, ?, ?, NOW())",
    [admin_id, action, entry_type]
  );
}

export async function GET() {
  try {
    const db = await connectToDatabase();
    const [users] = await db.query("SELECT * FROM users");
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { user_id, admin_id } = await req.json();
    const db = await connectToDatabase();
    await db.query("DELETE FROM users WHERE user_id = ?", [user_id]);
    await logAdminAction(admin_id, `Deleted user: ${user_id}`, "DELETE");
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { user_id, status, admin_id } = await req.json();
    const db = await connectToDatabase();
    await db.query("UPDATE users SET status = ? WHERE user_id = ?", [status, user_id]);
    await logAdminAction(admin_id, `Changed status for user: ${user_id} to ${status}`, "UPDATE");
    return NextResponse.json({ message: "User status updated" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user status" }, { status: 500 });
  }
}
