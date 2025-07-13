import React, { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add validation or API submission here
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div
      className="w-full min-h-screen pt-[50px] flex justify-center items-start px-4 sm:px-10 md:px-20 lg:px-32 pb-[70px]"
      style={{
        minHeight: "calc(100vh - 70px)",
        background: `linear-gradient(135deg, #0f2027, #203a43, #2c5364)`,
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-2xl p-10 shadow-2xl text-white"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 text-cyan-400 text-center">
          Contact Us
        </h2>

        {submitted && (
          <p className="mb-6 text-green-400 font-semibold text-center animate-fade-in text-sm sm:text-base md:text-lg">
            Thank you for contacting us! We'll get back to you soon.
          </p>
        )}

        <label className="block mb-6">
          <span className="text-xs sm:text-sm md:text-base font-semibold mb-2 block">
            Name
          </span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className="w-full px-5 py-3 rounded-lg bg-slate-700 border border-gray-600 focus:outline-none focus:ring-4 focus:ring-cyan-400 text-white placeholder-slate-400 text-sm sm:text-base md:text-lg transition"
          />
        </label>

        <label className="block mb-6">
          <span className="text-xs sm:text-sm md:text-base font-semibold mb-2 block">
            Email
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@example.com"
            className="w-full px-5 py-3 rounded-lg bg-slate-700 border border-gray-600 focus:outline-none focus:ring-4 focus:ring-cyan-400 text-white placeholder-slate-400 text-sm sm:text-base md:text-lg transition"
          />
        </label>

        <label className="block mb-8">
          <span className="text-xs sm:text-sm md:text-base font-semibold mb-2 block">
            Message
          </span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            placeholder="Write your message here..."
            className="w-full px-5 py-3 rounded-lg bg-slate-700 border border-gray-600 focus:outline-none focus:ring-4 focus:ring-cyan-400 text-white placeholder-slate-400 resize-none text-sm sm:text-base md:text-lg transition"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 transition font-bold py-4 rounded-xl text-base sm:text-lg md:text-xl shadow-lg"
        >
          Send Message
        </button>
      </form>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}
