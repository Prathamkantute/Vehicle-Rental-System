"use client";

import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/usercontext";

export default function AdminVehiclesPage() {
	const [vehicles, setVehicles] = useState([]);
	const [error, setError] = useState("");
	const { user } = useContext(UserContext);

	const fetchVehicles = () => {
		fetch("/api/vehicles")
			.then((res) => res.json())
			.then(setVehicles)
			.catch(() => setError("Failed to load vehicles"));
	};

	useEffect(() => {
		fetchVehicles();
	}, []);

		const handleDelete = async (vehicle_id) => {
		if (!user || !user.username) return alert("Admin not found in context");
		const admin_id = user.admin_id || 1; // Replace with real admin_id if available
		if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
		const res = await fetch("/api/vehicles/admin", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ vehicle_id, admin_id }),
		});
		if (res.ok) fetchVehicles();
		else alert("Failed to delete vehicle");
	};

			const handleEdit = async (vehicle) => {
				if (!user || !user.username) return alert("Admin not found in context");
				const admin_id = user.admin_id || 1; // Replace with real admin_id if available
				const daily_rate = prompt("New Daily Rate?", vehicle.daily_rate);
				if (!daily_rate) return;
				const available_stock = prompt("New Available Stock?", vehicle.available_stock);
				if (!available_stock) return;
				const status = prompt("Status? (available/unavailable)", vehicle.status);
				if (!status) return;
				const res = await fetch("/api/vehicles/admin", {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ vehicle_id: vehicle.vehicle_id, daily_rate, available_stock, status, admin_id }),
				});
				if (res.ok) fetchVehicles();
				else alert("Failed to update vehicle");
			};

			const handleAdd = async () => {
			if (!user || !user.username) return alert("Admin not found in context");
			const admin_id = user.admin_id || 1; // Replace with real admin_id if available
			const vehicle_name = prompt("Vehicle Name?");
			if (!vehicle_name) return;
			const brand = prompt("Brand?");
			if (!brand) return;
			const type = prompt("Type?");
			if (!type) return;
			const registration_no = prompt("Registration Number?");
			if (!registration_no) return;
			const daily_rate = prompt("Daily Rate?");
			if (!daily_rate) return;
			const available_stock = prompt("Available Stock?");
			if (!available_stock) return;
			const status = prompt("Status? (available/unavailable)");
			if (!status) return;
			const res = await fetch("/api/vehicles/admin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ vehicle_name, brand, type, registration_no, daily_rate, available_stock, status, admin_id }),
			});
			if (res.ok) fetchVehicles();
			else alert("Failed to add vehicle");
		};

	return (
		<div className="p-8 text-white">
			<h2 className="text-2xl font-bold mb-6 text-purple-400">Admin: Manage Vehicles</h2>
			{error && <p className="text-red-500 mb-4">{error}</p>}
			<table className="w-full mb-8 bg-gray-800 rounded-lg overflow-hidden">
				<thead>
					<tr className="bg-gray-700">
						<th className="py-2 px-4">ID</th>
						<th className="py-2 px-4">Brand</th>
						<th className="py-2 px-4">Model</th>
						<th className="py-2 px-4">Type</th>
						<th className="py-2 px-4">Price/Day</th>
						<th className="py-2 px-4">Status</th>
						<th className="py-2 px-4">Actions</th>
					</tr>
				</thead>
				<tbody>
					{vehicles.map((v) => (
						<tr key={v.vehicle_id} className="border-b border-gray-700">
							<td className="py-2 px-4">{v.vehicle_id}</td>
							<td className="py-2 px-4">{v.brand}</td>
							<td className="py-2 px-4">{v.vehicle_name}</td>
							<td className="py-2 px-4">{v.type}</td>
							<td className="py-2 px-4">{v.daily_rate}</td>
							<td className="py-2 px-4">{v.status}</td>
							<td className="py-2 px-4">
								<button className="bg-blue-600 px-3 py-1 rounded mr-2" onClick={() => handleEdit(v)}>Edit</button>
								<button className="bg-red-600 px-3 py-1 rounded" onClick={() => handleDelete(v.vehicle_id)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<button className="bg-green-600 px-6 py-2 rounded font-bold" onClick={handleAdd}>Add Vehicle</button>
		</div>
	);
}