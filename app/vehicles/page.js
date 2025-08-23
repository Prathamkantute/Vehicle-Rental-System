"use client";

import { useEffect, useState } from "react";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("/api/vehicles")
      .then(res => res.json())
      .then(data => setVehicles(data));
  }, []);

  return (
    <div>
      <h1>Available Vehicles</h1>
      <ul>
        {vehicles.map(v => (
          <li key={v.vehicle_id}>
            {v.vehicle_name} - {v.brand} ({v.type}) - ₹{v.daily_rate}/day
          </li>
        ))}
      </ul>
    </div>
  );
}
