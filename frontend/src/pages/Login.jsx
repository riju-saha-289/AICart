import React, { useState } from "react";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from 'axios'
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utility/Firebase";
import { useContext } from "react";
import { Context } from "../context/Context";
import { useEffect } from "react";
export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data,setdata]=useState({
    email:"",
    password:""
  })
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
        `${backend_url}/api/Auth/login`,
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
      await getCurrentUser()
      navigate('/')
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleGoogLogIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const name = user.displayName;
    const email = user.email;

    const response = await axios.post(
      `${backend_url}/api/Auth/googlelogin`,
      { name, email },
      { withCredentials: true }
    );
    console.log("Response:", response.data);

    // Wait for userData to be set correctly before navigation
    await getCurrentUser();

    // Slight delay (100ms) to ensure context updated before redirect
    setTimeout(() => {
      navigate("/");
    }, 100);

  } catch (error) {
    console.error("Error:", error);
  }
};
useEffect(()=>{
  setdata({
      email: "",
      password: "",
    });
},[])


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="AICart Logo" className="h-14 w-auto" />
        </div>

        {/* Welcome text */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Log in to your AICart account
        </p>

        {/* Google login */}
        <button
          onClick={handleGoogLogIn}
          className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 transition"
        >
          <img src={google} alt="Google" className="w-5 h-5 mr-3" />
          Log in with Google
        </button>

        {/* Separator */}
        <div className="my-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Login form */}
        <form className="space-y-5"
        onSubmit={handlesubmit}>
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

        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/registration")}
          >
            Register now
          </button>
        </p>
      </div>
    </div>
  );
}
