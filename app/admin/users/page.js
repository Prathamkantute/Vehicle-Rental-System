"use client";

import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/usercontext";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const { user } = useContext(UserContext);

  const fetchUsers = () => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(() => setError("Failed to load users"));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (user_id) => {
    if (!user || !user.username) return alert("Admin not found in context");
    const admin_id = user.admin_id || 1; // Replace with real admin_id if available
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const res = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, admin_id }),
    });
    if (res.ok) fetchUsers();
    else alert("Failed to delete user");
  };

  const handleBlockUnblock = async (user_id, currentStatus) => {
    if (!user || !user.username) return alert("Admin not found in context");
    const admin_id = user.admin_id || 1; // Replace with real admin_id if available
    const newStatus = currentStatus === "blocked" ? "active" : "blocked";
    const res = await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, status: newStatus, admin_id }),
    });
    if (res.ok) fetchUsers();
    else alert("Failed to update user status");
  };

  return (
    <div className="p-8 text-white">
      <h2 className="text-2xl font-bold mb-6 text-purple-400">Admin: Manage Users</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="w-full mb-8 bg-gray-800 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-700">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Username</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.user_id} className="border-b border-gray-700">
              <td className="py-2 px-4">{u.user_id}</td>
              <td className="py-2 px-4">{u.username}</td>
              <td className="py-2 px-4">{u.email}</td>
              <td className="py-2 px-4">{u.phone_number}</td>
              <td className="py-2 px-4">{u.status || "active"}</td>
              <td className="py-2 px-4">
                <button className="bg-red-600 px-3 py-1 rounded mr-2" onClick={() => handleDelete(u.user_id)}>Delete</button>
                <button className="bg-blue-600 px-3 py-1 rounded" onClick={() => handleBlockUnblock(u.user_id, u.status || "active")}>{u.status === "blocked" ? "Unblock" : "Block"}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
