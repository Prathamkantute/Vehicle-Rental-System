"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          localStorage.removeItem("authToken");
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("authToken");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    router.push("/login");
  };

  return (
    <header className="bg-gray-900 text-white px-10 py-4 flex justify-between items-center shadow-md">
      <Link href="/" className="text-2xl font-bold text-purple-400">
        🚗 MyRental
      </Link>

      <nav>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="font-semibold text-lg text-purple-300">
              Hi, {user.username} 👋
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-500 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-purple-300 transition">
              Login
            </Link>
            <Link href="/signup" className="hover:text-purple-300 transition">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
