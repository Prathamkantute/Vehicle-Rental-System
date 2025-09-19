import { connectToDatabase } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const db = await connectToDatabase();
    const { searchParams } = new URL(req.url);
    // If ?distinct=1, return unique brands/types for filter dropdowns
    if (searchParams.get("distinct") === "1") {
      const [brands] = await db.query("SELECT DISTINCT brand FROM vehicles");
      const [types] = await db.query("SELECT DISTINCT type FROM vehicles");
      return NextResponse.json({
        brands: brands.map((b) => b.brand),
        types: types.map((t) => t.type),
      });
    }

    // Build SQL with search/filter
    let sql = "SELECT * FROM vehicles WHERE 1=1";
    const params = [];
    const search = searchParams.get("search");
    const brand = searchParams.get("brand");
    const type = searchParams.get("type");
    if (search) {
      sql += " AND (vehicle_name LIKE ? OR brand LIKE ? OR type LIKE ?)";
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    if (brand) {
      sql += " AND brand = ?";
      params.push(brand);
    }
    if (type) {
      sql += " AND type = ?";
      params.push(type);
    }
    const [rows] = await db.query(sql, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch vehicles" }, { status: 500 });
  }
}
