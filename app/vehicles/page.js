"use client";

import { useEffect, useState } from "react";

export default function CustomerVehicles() {
  const [vehicles, setVehicles] = useState([]);

  // ✅ Fetch vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch("/api/vehicles");
        const data = await res.json();
        setVehicles(data);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div style={{ minHeight: "100vh", padding: "20px", color: "white" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "20px", textAlign: "center" }}>
        🚘 Available Vehicles
      </h2>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            background: "white",
            color: "#4e1c96",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead style={{ background: "#4e1c96", color: "white" }}>
            <tr>
              <th style={thStyle}>Serial No.</th>
              <th style={thStyle}>Vehicle Name</th>
              <th style={thStyle}>Brand</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Rate (per day)</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length > 0 ? (
              vehicles.map((v) => (
                <tr key={v.vehicle_id}>
                  <td style={tdStyle}>{v.vehicle_id}</td>
                  <td style={tdStyle}>{v.vehicle_name}</td>
                  <td style={tdStyle}>{v.brand}</td>
                  <td style={tdStyle}>{v.type}</td>
                  <td style={tdStyle}>₹{v.daily_rate}</td>
                  <td style={tdStyle}>{v.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ ...tdStyle, textAlign: "center" }}>
                  No vehicles available 🚫
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};
