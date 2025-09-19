export async function PUT(req) {
  try {
    const { vehicle_id, daily_rate, available_stock, status, admin_id } = await req.json();
    const db = await connectToDatabase();
    await db.query(
      "UPDATE vehicles SET daily_rate = ?, available_stock = ?, status = ? WHERE vehicle_id = ?",
      [daily_rate, available_stock, status, vehicle_id]
    );
    await logAdminAction(admin_id, `Updated vehicle: ${vehicle_id} (rate: ${daily_rate}, stock: ${available_stock}, status: ${status})`, "UPDATE");
    return NextResponse.json({ message: "Vehicle updated" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update vehicle" }, { status: 500 });
  }
}
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

export async function POST(req) {
  try {
    const { vehicle_name, brand, type, registration_no, daily_rate, available_stock, status, admin_id } = await req.json();
    const db = await connectToDatabase();
    await db.query(
      "INSERT INTO vehicles (vehicle_name, brand, type, registration_no, daily_rate, available_stock, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [vehicle_name, brand, type, registration_no, daily_rate, available_stock, status]
    );
    await logAdminAction(admin_id, `Added vehicle: ${brand} ${vehicle_name}`, "CREATE");
    return NextResponse.json({ message: "Vehicle added" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add vehicle" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { vehicle_id, admin_id } = await req.json();
    const db = await connectToDatabase();
    await db.query("DELETE FROM vehicles WHERE vehicle_id = ?", [vehicle_id]);
    await logAdminAction(admin_id, `Deleted vehicle: ${vehicle_id}`, "DELETE");
    return NextResponse.json({ message: "Vehicle deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete vehicle" }, { status: 500 });
  }
}
