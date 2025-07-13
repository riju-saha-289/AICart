import React, { useState } from "react";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import {useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utility/Firebase";
import { useContext } from "react";
import { Context } from "../context/Context";



export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const {backend_url,getCurrentUser}=useContext(Context)

  const handlechange = (e) => {
    setdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backend_url}/api/Auth/registration`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Response:", response.data);
      setdata({
        name: "",
        email: "",
        password: "",
      });
      await getCurrentUser()
      navigate('/')
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const name = user.displayName;
      const email = user.email;
      try {
        const response = await axios.post(
          `${backend_url}/api/Auth/googlelogin`,
          {
            name,
            email,
          },
          {
            withCredentials: true,
          }
        );
        // console.log("Response:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="AICart Logo" className="h-14 w-auto" />
        </div>

        {/* WELCOME TEXT */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome to AICart
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Create your free account
        </p>

        {/* GOOGLE AUTH BUTTON */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 transition"
        >
          <img src={google} alt="Google" className="w-5 h-5 mr-3" />
          Sign up with Google
        </button>

        {/* SEPARATOR */}
        <div className="my-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* REGISTRATION FORM */}
        <form className="space-y-5" onSubmit={handlesubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              name="name"
              placeholder="Your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handlechange}
              value={data.name}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handlechange}
              value={data.email}
            />
          </div>

          {/* Password with eye icon */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handlechange}
              value={data.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-3 text-gray-600 hover:text-blue-600"
            >
              {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/login")}
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
