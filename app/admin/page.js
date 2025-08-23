"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div style={{
      minHeight: "100vh",
      color: "white",
      padding: "40px",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#c084fc" }}>🛠️ Admin Dashboard</h1>
      <p style={{ marginBottom: "30px", fontSize: "18px", color: "#d1d5db" }}>
        Manage your vehicle rental system here.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        <Link href="/admin/vehicles" style={cardStyle}>
          🚘 Manage Vehicles
        </Link>
        <Link href="/admin/rentals" style={cardStyle}>
          📑 View All Rentals
        </Link>
        <Link href="/admin/users" style={cardStyle}>
          👤 Manage Users
        </Link>
        <Link href="/admin/maintenance" style={cardStyle}>
          🛠️ Maintenance Records
        </Link>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#1f2937",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  textDecoration: "none",
  transition: "all 0.3s ease",
  boxShadow: "0px 4px 15px rgba(0,0,0,0.5)"
};
