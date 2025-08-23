"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CustomerDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      return;
    }
  }, [router]);

  return (
    <div className="min-h-screen text-white p-10 font-sans">
      <h1 className="text-4xl font-bold text-violet-400 mb-4">
        🚗 Customer Dashboard
      </h1>
      <p className="mb-8 text-lg text-gray-300">
        Welcome! What would you like to drive today?
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Link
          href="/customer/vehicles"
          className="bg-gray-800 p-5 rounded-xl text-center text-lg font-bold text-white no-underline transition-all hover:bg-gray-700 shadow-lg"
        >
          🚘 View Available Vehicles
        </Link>
        <Link
          href="/customer/rentals"
          className="bg-gray-800 p-5 rounded-xl text-center text-lg font-bold text-white no-underline transition-all hover:bg-gray-700 shadow-lg"
        >
          📑 My Rentals
        </Link>
      </div>
    </div>
  );
}
