// src/component/Nav.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiHome,
  FiBox,
  FiInfo,
  FiPhone,
} from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { createPortal } from "react-dom";

import logo from "../assets/logo.png";
import { Context } from "../context/Context";

export default function Nav() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const {
    userData,
    search,
    setSearch,
    searchOpen,
    setSearchOpen,
    cartCount,
    logout,
  } = useContext(Context);

  const navigate = useNavigate();
  const profileButtonRef = useRef(null);
  const dropdownRef = useRef(null);

  const userInitial = userData?.username?.charAt(0).toUpperCase() || "";
  const [dropdownStyles, setDropdownStyles] = useState({});

  // Track window width for responsive behavior
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        !profileButtonRef.current?.contains(e.target) &&
        !dropdownRef.current?.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  // Position profile dropdown under profile button
  useEffect(() => {
    if (profileOpen && profileButtonRef.current) {
      const rect = profileButtonRef.current.getBoundingClientRect();
      setDropdownStyles({
        position: "absolute",
        top: rect.bottom + window.scrollY + 8,
        left: rect.right + window.scrollX - 180,
        zIndex: 10000,
        width: "11rem",
      });
    }
  }, [profileOpen]);

  // Search input change handler
  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    if (window.location.pathname !== "/collection") navigate("/collection");
  };

  // Logout handler
  const handleLogout = async () => {
    if (window.confirm("Do you really want to logout?")) {
      await logout();
      navigate("/");
    }
  };

  // Nav items with icons for mobile bottom nav
  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <FiHome />,
    },
    {
      name: "Collection",
      path: "/collection",
      icon: <FiBox />,
    },
    {
      name: "About",
      path: "/about",
      icon: <FiInfo />,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: <FiPhone />,
    },
  ];

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 flex-wrap overflow-visible">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 min-w-0">
              <Link to="/" className="flex items-center">
                <img className="h-8 w-auto sm:h-10" src={logo} alt="AICart" />
                <span className="ml-2 font-bold text-base sm:text-xl text-white truncate">
                  AICart
                </span>
              </Link>
            </div>

            {/* Desktop nav links - show on md and up */}
            <div className="hidden md:flex space-x-2 sm:space-x-4 items-center">
              {navItems.map(({ name, path }) => (
                <NavLink
                  key={name}
                  to={path}
                  className={({ isActive }) =>
                    `px-2 py-1 sm:px-4 sm:py-1.5 rounded-full font-medium text-sm sm:text-base transition duration-300 transform hover:scale-105 hover:shadow-md
                    ${
                      isActive
                        ? "bg-white text-indigo-700"
                        : "text-white bg-white/10 hover:bg-white/20"
                    }`
                  }
                >
                  {name}
                </NavLink>
              ))}
            </div>

            {/* Right-side icons (always visible) */}
            <div
              className={`flex items-center ${
                windowWidth >= 400 && windowWidth <= 640
                  ? "space-x-6 mr-8"
                  : "space-x-4"
              } mt-2 sm:mt-0`}
            >
              {/* Search toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white text-base sm:text-xl hover:text-yellow-300 transition-transform duration-300 hover:scale-110"
                aria-label="Toggle search"
              >
                <FiSearch />
              </button>

              {/* Profile button */}
              <button
                ref={profileButtonRef}
                onClick={() => setProfileOpen(!profileOpen)}
                className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm sm:text-base hover:ring-2 ring-white transition duration-300"
                aria-haspopup="true"
                aria-expanded={profileOpen}
                aria-label="User profile menu"
              >
                {userData?.username ? (
                  userInitial
                ) : (
                  <FaRegUserCircle className="text-black text-lg" />
                )}
              </button>

              {/* Cart */}
              <div className="relative">
                <Link
                  to="/cart"
                  className="text-white text-base sm:text-xl hover:text-yellow-300 transition-transform duration-300 hover:scale-110"
                  aria-label="Go to cart"
                >
                  <FiShoppingCart />
                </Link>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full px-1.5 font-bold shadow">
                    {cartCount}
                  </span>
                )}
              </div>

              {/* Mobile menu toggle button: only show if width >= 400 */}
              {windowWidth >= 400 && (
                <div className="md:hidden">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-white text-lg sm:text-2xl hover:text-yellow-300"
                    aria-label="Toggle mobile menu"
                  >
                    {mobileMenuOpen ? <FiX /> : <FiMenu />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="w-full bg-white shadow-inner py-3 px-2 flex justify-center animate-fadeIn">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full max-w-xs sm:max-w-2xl px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
              onChange={handleSearchChange}
              value={search}
            />
          </div>
        )}

        {/* Mobile menu (text only) */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md px-2 pt-2 pb-4 space-y-2">
            {navItems.map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) =>
                  `block text-sm font-medium px-2 py-1 rounded transition
                  ${
                    isActive
                      ? "text-blue-600 bg-blue-100"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {name}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* Bottom mobile icon nav - shows only below 400px */}
      {windowWidth < 400 && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-inner md:hidden flex justify-around items-center h-14">
          {navItems.map(({ name, path, icon }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center text-white text-xs transition-all duration-300
                ${
                  isActive ? "text-yellow-300" : "hover:text-yellow-300"
                }`
              }
              aria-label={name}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="text-xl">{icon}</div>
            </NavLink>
          ))}
        </nav>
      )}

      {/* Profile dropdown */}
      {profileOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={dropdownStyles}
            className="bg-white rounded-md shadow-xl ring-1 ring-black ring-opacity-5 animate-fadeIn"
            role="menu"
          >
            <div className="py-2 text-sm">
              <button
                onClick={() => {
                  setProfileOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100"
              >
                Log Out
              </button>
              <NavLink
                to="/orders"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                onClick={() => setProfileOpen(false)}
              >
                Orders
              </NavLink>
              <NavLink
                to="/about"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                onClick={() => setProfileOpen(false)}
              >
                About
              </NavLink>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
