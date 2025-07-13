import React from "react";
import Hero from "../components/Hero";
import Product from "./Product";
import OurPolicy from "../components/OurPolicy";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div
      className="relative z-0 min-h-screen text-gray-100"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #0f172a 100%)",
      }}
    >
      {/* Hero section with padding */}
      <section className="pt-[70px] px-6 md:px-20 lg:px-32">
        <Hero />
      </section>

      {/* Product section with spacing */}
      <section className="mt-16 px-6 md:px-20 lg:px-32">
        <Product />
      </section>

      {/* OurPolicy section with spacing and background highlight */}
      <section className="mt-20 px-6 md:px-20 lg:px-32">
        <OurPolicy />
      </section>
      <section className="mt-20 px-6 md:px-20 lg:px-32">
        <Footer />
      </section>
    </div>
  );
}
