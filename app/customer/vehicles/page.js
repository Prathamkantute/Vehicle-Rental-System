"use client";

import { useEffect, useState } from "react";


export default function CustomerVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);

  // Fetch vehicles with search/filter
  const fetchVehicles = async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`/api/vehicles${query ? `?${query}` : ""}`);
      const data = await res.json();
      setVehicles(data);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    }
  };

  // Fetch unique brands/types for filter dropdowns
  const fetchFilters = async () => {
    try {
      const res = await fetch("/api/vehicles?distinct=1");
      const data = await res.json();
      setBrands(data.brands || []);
      setTypes(data.types || []);
    } catch (err) {
      // fallback: do nothing
    }
  };

  useEffect(() => {
    fetchVehicles();
    fetchFilters();
  }, []);

  // Handle search/filter
  const handleSearch = (e) => {
    e.preventDefault();
    fetchVehicles({ search, type, brand });
  };

  return (
    <div style={{ minHeight: "100vh", padding: "20px", color: "white" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "20px", textAlign: "center" }}>
        🚘 Available Vehicles
      </h2>

      {/* Search and Filter Bar */}
      <form onSubmit={handleSearch} style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Search by name, brand, type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc", minWidth: 200 }}
        />
        <select value={brand} onChange={e => setBrand(e.target.value)} style={{ padding: 8, borderRadius: 4 }}>
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <select value={type} onChange={e => setType(e.target.value)} style={{ padding: 8, borderRadius: 4 }}>
          <option value="">All Types</option>
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <button type="submit" style={{ padding: 8, borderRadius: 4, background: "#4e1c96", color: "white", border: "none" }}>Search</button>
      </form>

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
