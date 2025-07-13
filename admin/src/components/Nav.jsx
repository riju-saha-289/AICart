// components/Header.jsx
import React from "react";
import { assets } from "../assets/assets";
import axios from 'axios'
import { useContext } from "react";
import {AdminContext} from '../context/AdminContext'
import { useNavigate } from 'react-router-dom';
import AdminPanel from "../Pages/AdminPanel";
import Login from "./Login";
export default function Nav() {
  const {backend_url,getAdmin}=useContext(AdminContext)
  const navigate = useNavigate();
  const adminlogout=async()=>{
     if (!window.confirm("Are you sure you want to LogOut?")) return;
    const response=await axios.get(
      `${backend_url}/api/Auth/adminlogout`,{
        withCredentials:true
      }
    )
    if (response.data){
       getAdmin()
    }
  }
  return (
    <header className="bg-white shadow-md flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2"
      onClick={()=>navigate("/")}>
        <img src={assets.logo} alt="logo" className="h-10 w-auto" />
        <span className="text-xl font-bold text-indigo-700 hidden sm:inline">AICart</span>
      </div>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
      onClick={adminlogout}>
        Logout
      </button>
    </header>
  );
}
