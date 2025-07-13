import React from "react";
import about from '../assets/about.jpg'
export default function About() {
  return (
    <div
      className="min-h-screen pt-[70px] px-6 md:px-20 lg:px-32 bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-900 text-gray-100 flex flex-col justify-center"
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 mb-12 text-center">
        About Us
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
        {/* Image Section */}
        <div className="flex-shrink-0 w-full md:w-1/2 rounded-lg overflow-hidden shadow-2xl border border-cyan-700">
          <img src={about} alt="" />
          
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-gray-300 text-justify space-y-6">
          <p className="text-lg leading-relaxed">
            Welcome to AICart! We are passionate about delivering the highest quality products with unmatched customer service. Founded in 2024, our mission is to provide a seamless shopping experience that combines style, quality, and affordability.
          </p>
          <p className="text-lg leading-relaxed">
            Our team works tirelessly to source the best materials and stay ahead of trends to ensure you always find something that fits your style and needs. We believe in transparency, sustainability, and building lasting relationships with our customers.
          </p>
          <p className="text-lg leading-relaxed">
            Thank you for being a part of our journey. We are excited to grow and innovate with you, bringing fresh collections and meaningful experiences season after season.
          </p>
        </div>
      </div>
    </div>
  );
}
