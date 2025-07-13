import React from "react";
import { FaShippingFast, FaUndoAlt, FaShieldAlt, FaEnvelope } from "react-icons/fa";

export default function OurPolicy() {
  return (
    <div
      className="max-w-6xl mx-auto px-6 md:px-12 py-12 bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-900 rounded-xl shadow-2xl text-gray-100"
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-cyan-400 text-center">
        Our Policy
      </h1>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Shipping Card */}
        <div className="bg-gradient-to-tr from-cyan-700 via-cyan-600 to-cyan-700 rounded-lg p-6 shadow-lg flex flex-col items-start text-left">
          <FaShippingFast className="text-cyan-300 text-6xl mb-4" />
          <h2 className="text-2xl font-semibold mb-3">Shipping Policy</h2>
          <p className="text-gray-300 leading-relaxed">
            Orders are processed within 2-3 business days. Shipping times vary
            depending on your location but typically take 5-7 business days for
            standard delivery.
          </p>
        </div>

        {/* Return Card */}
        <div className="bg-gradient-to-tr from-cyan-700 via-cyan-600 to-cyan-700 rounded-lg p-6 shadow-lg flex flex-col items-start text-left">
          <FaUndoAlt className="text-cyan-300 text-6xl mb-4" />
          <h2 className="text-2xl font-semibold mb-3">Return Policy</h2>
          <p className="text-gray-300 leading-relaxed">
            If you’re not satisfied with your purchase, you can return it within
            14 days of delivery. Products must be unused and in original
            packaging. Please contact our support team to initiate a return.
          </p>
        </div>

        {/* Privacy Card */}
        <div className="bg-gradient-to-tr from-cyan-700 via-cyan-600 to-cyan-700 rounded-lg p-6 shadow-lg flex flex-col items-start text-left">
          <FaShieldAlt className="text-cyan-300 text-6xl mb-4" />
          <h2 className="text-2xl font-semibold mb-3">Privacy Policy</h2>
          <p className="text-gray-300 leading-relaxed">
            We respect your privacy and protect your personal information. Your
            data is securely stored and never shared with third parties without
            your consent.
          </p>
        </div>

        {/* Contact Card */}
        <div className="bg-gradient-to-tr from-cyan-700 via-cyan-600 to-cyan-700 rounded-lg p-6 shadow-lg flex flex-col items-start text-left">
          <FaEnvelope className="text-cyan-300 text-6xl mb-4" />
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-300 leading-relaxed">
            Have questions? Reach out to our customer support at{" "}
            <a
              href="mailto:support@example.com"
              className="text-cyan-400 underline hover:text-cyan-200 transition"
            >
              support@example.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
