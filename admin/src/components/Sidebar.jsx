import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "../assets/assets";

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useContext(AdminContext);
  const location = useLocation();
  const [showToggle, setShowToggle] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setSidebarOpen(false);       // Force close
        setShowToggle(false);        // Hide toggle
      }
       else {
        setSidebarOpen(true); 
        setShowToggle(true);         // Show toggle
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]);

  const navLinks = [
    { label: "Add Items", path: "/add", icon: assets.add_icon },
    { label: "List Items", path: "/list", icon: assets.list_icon },
    { label: "Orders", path: "/orders", icon: assets.order_icon },
  ];

  return (
    <div
      className={`bg-white shadow-md fixed top-0 left-0 h-screen flex flex-col z-50 transition-all duration-300
        ${sidebarOpen ? "w-64" : "min-w-[64px]"}
      `}
    >
      {/* Toggle Button */}
      {showToggle && (
        <div className="flex justify-end p-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-full hover:bg-indigo-100"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? (
              <ChevronLeft size={20} className="text-indigo-600" />
            ) : (
              <ChevronRight size={20} className="text-indigo-600" />
            )}
          </button>
        </div>
      )}

      {/* Title */}
      {sidebarOpen && (
        <div className="text-center text-xl font-bold text-indigo-700 mb-6">
          Admin Panel
        </div>
      )}

      {/* Nav Links */}
      <nav className="flex flex-col gap-3 px-2">
        {navLinks.map((link, index) => {
          const isActive = location.pathname === link.path;
          return (
            <a
              href={link.path}
              key={index}
              className={`group relative flex items-center gap-3 px-4 py-2 rounded-lg transition
                ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                }
              `}
              title={!sidebarOpen ? link.label : ""}
            >
              <img
                src={link.icon}
                alt={link.label}
                className={`w-6 h-6 ${sidebarOpen ? "mr-2" : "mx-auto"}`}
              />
              {sidebarOpen && <span>{link.label}</span>}

              {!sidebarOpen && (
                <span className="absolute left-16 z-10 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {link.label}
                </span>
              )}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
