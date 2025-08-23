"use client";

import "./globals.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserProvider, UserContext } from "./context/usercontext"; // adjust path

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <AppContent>{children}</AppContent>
        </UserProvider>
      </body>
    </html>
  );
}

// Separate component to use useContext for navbar
function AppContent({ children }) {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-900 via-purple-900 to-black text-white">
      {/* Navbar */}
      <header className="flex justify-between items-center px-10 py-6">
        <div className="text-2xl font-bold tracking-wide">CarRental</div>
        <nav className="flex gap-8 text-lg font-semibold">
          <Link href="/" className="hover:text-indigo-400 transition">Home</Link>
          <Link href="/about" className="hover:text-indigo-400 transition">About</Link>
          <Link href="/vehicles" className="hover:text-indigo-400 transition">Vehicles</Link>
          <Link href="/contact" className="hover:text-indigo-400 transition">Contact</Link>
        </nav>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-semibold text-lg text-purple-300">Hi, {user.username} 👋</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link
                href="/login"
                className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="ml-3 px-4 py-2 rounded-md border border-indigo-400 hover:bg-indigo-400 hover:text-black transition"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-400 py-4 border-t border-gray-700">
        © {new Date().getFullYear()} CarRental. All Rights Reserved.
      </footer>
    </div>
  );
}
