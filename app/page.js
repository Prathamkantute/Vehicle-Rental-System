'use client'
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
        Rent Your Ride <br /> Anytime, Anywhere
      </h1>
      <p className="max-w-2xl text-lg text-gray-300 mb-10">
        Choose from a wide range of vehicles with affordable pricing and easy booking.  
        Drive with comfort and style today!
      </p>
      <div className="flex gap-6">
        <Link href="/vehicles" className="px-6 py-3 rounded-md bg-indigo-600 text-lg font-semibold hover:bg-indigo-500 transition">
          Book Now
        </Link>
        <Link href="/about" className="px-6 py-3 rounded-md border border-white text-lg font-semibold hover:bg-white hover:text-black transition">
          Learn More →
        </Link>
      </div>
    </div>
  );
}
