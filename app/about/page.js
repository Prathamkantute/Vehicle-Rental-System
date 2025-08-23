"use client";
export default function AboutPage() {
  return (
    <div className="min-h-screen p-8 text-white font-sans bg-gradient-to-r from-indigo-900 via-purple-900 to-black">
      <section className="max-w-6xl mx-auto py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-200">
            About CarRental
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            CarRental makes vehicle booking simple, fast, and reliable. We connect customers with a curated fleet of cars, bikes, and scooters — supported by transparent pricing and friendly service.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-200">Our Mission</h2>
            <p className="text-gray-300">
              We aim to simplify local mobility by offering a trustworthy rental platform where availability, pricing, and vehicle condition are clear upfront. Our focus is safety, affordability, and a great user experience.
            </p>

            <h3 className="text-xl font-semibold text-purple-100">What we offer</h3>
            <ul className="space-y-3 text-gray-300">
              <li>• Wide range of vehicles: economy to luxury, cars, bikes and scooters.</li>
              <li>• Flexible rental durations: hourly, daily, or weekly bookings.</li>
              <li>• Transparent pricing with no hidden fees.</li>
              <li>• 24/7 customer support and roadside assistance partners.</li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-purple-100">Key Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard title="Easy Booking" desc="Book in seconds with a clear, simple flow." emoji="🚗" />
              <FeatureCard title="Secure Payments" desc="Multiple safe payment options and receipts." emoji="💳" />
              <FeatureCard title="Verified Vehicles" desc="All vehicles pass safety checks before listing." emoji="🔧" />
              <FeatureCard title="Customer Support" desc="Help when you need it — via chat, phone, or email." emoji="📞" />
            </div>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-purple-200 mb-6 text-center">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <StepCard step={1} title="Search" desc="Find vehicles by type, brand or price." emoji="🔎" />
            <StepCard step={2} title="Select & Book" desc="Choose a vehicle and reserve with your preferred dates." emoji="✅" />
            <StepCard step={3} title="Pickup/Delivery" desc="Pickup from a nearby location or get it delivered." emoji="🚚" />
          </div>
        </section>
        <div className="text-center mt-8">
          <p className="text-gray-300 mb-4">Ready to go? Browse our vehicles to get started.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="/customer/vehicles" className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold">View Vehicles</a>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, desc, emoji }) {
  return (
    <div className="p-4 bg-white/6 rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-2xl">{emoji}</div>
        <h4 className="font-semibold text-white">{title}</h4>
      </div>
      <p className="text-gray-300 text-sm">{desc}</p>
    </div>
  );
}

function StepCard({ step, title, desc, emoji }) {
  return (
    <div className="p-6 bg-white/5 rounded-xl text-center">
      <div className="text-3xl mb-3">{emoji}</div>
      <h4 className="font-bold text-white mb-1">{step}. {title}</h4>
      <p className="text-gray-300">{desc}</p>
    </div>
  );
}

