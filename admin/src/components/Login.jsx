import React, { useState } from "react";
import logo from "../assets/logo.png";

import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from 'axios'

import { useContext } from "react";
import { AdminContext} from "../context/AdminContext";


export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data,setdata]=useState({
    email:"",
    password:""
  })
  const {backend_url,getAdmin}=useContext(AdminContext)

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
        `${backend_url}/api/Auth/adminlogin`,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Response:", response.data);
      setdata({
        email: "",
        password: "",
      });
      getAdmin()
      navigate('/')
      
    } catch (error) {
      setdata({
        email: "",
        password: "",
      });
      console.error("Error:", error);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="AICart Logo" className="h-14 w-auto" />
        </div>

        {/* Welcome text */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Apply to admin login
        </p>

        {/* Login form */}
        <form className="space-y-5 "
        onSubmit={handlesubmit}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handlechange}
              value={data.email}
              name="email"
              autoComplete="new-email"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              autoComplete="new-password"
              onChange={handlechange}
              value={data.password}
              name="password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute top-9 right-3 text-gray-600 hover:text-blue-600"
            >
              {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
