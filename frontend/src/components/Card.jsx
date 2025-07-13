import React from "react";
import { Link } from "react-router-dom";

export default function Card({ id, name, image, price }) {
  return (
    <Link
      to={`/productdetails/${id}`}
      className="block rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.03] duration-300"
      style={{
        background: "linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)",
      }}
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-3 sm:p-4 bg-gradient-to-b from-transparent to-white/90">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">{name}</h3>
        <p className="mt-1 text-xs sm:text-sm font-medium text-gray-700">₹ {price}</p>
      </div>
    </Link>
  );
}
