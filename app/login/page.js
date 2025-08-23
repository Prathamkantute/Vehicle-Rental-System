"use client";

import { useState, useContext } from "react"; // ✅ Add useContext here
import { useRouter } from "next/navigation";
import { UserContext } from "./../context/usercontext"; // adjust path

export default function LoginPage() {
  const { setUser } = useContext(UserContext); // ✅ access context
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ Save JWT token in localStorage
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        setUser({ username }); // ✅ Set user immediately after login
      }

      router.push(data.role === "admin" ? "/admin" : "/customer");
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
          Login Account
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

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
          Login
        </button>

        <p className="text-center mt-4 text-sm text-gray-400">
          Don’t have an account?{" "}
          <a href="/signup" className="text-purple-400 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
