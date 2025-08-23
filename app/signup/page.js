"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900/95 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-[500px] text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">
          Create Account
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mb-4 text-center">{success}</p>}

        <div className="mb-5">
          <label className="block mb-2 font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-purple-700 focus:outline-none focus:border-purple-500 text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-purple-700 focus:outline-none focus:border-purple-500 text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition font-bold"
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 font-semibold hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
