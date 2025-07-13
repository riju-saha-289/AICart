import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 py-8 px-6 md:px-20 lg:px-32 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          {/* Replace with your actual logo image or svg */}
          
          <img src= {logo}alt="" className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-xl"/>
          <span className="text-xl font-semibold text-cyan-400 select-none">AICart</span>
        </div>

        {/* Links */}
        <nav className="flex gap-6 text-sm flex-wrap justify-center md:justify-start">
          <a href="/" className="hover:text-cyan-400 transition">Home</a>
          <a href="/collections" className="hover:text-cyan-400 transition">Collections</a>
          <a href="/about" className="hover:text-cyan-400 transition">About</a>
          <a href="/contact" className="hover:text-cyan-400 transition">Contact</a>
          <a href="/policy" className="hover:text-cyan-400 transition">Policy</a>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-5 text-gray-400">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-cyan-400 transition">
            <FaFacebookF size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-cyan-400 transition">
            <FaTwitter size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-cyan-400 transition">
            <FaInstagram size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-cyan-400 transition">
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500 select-none">
        &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
}
