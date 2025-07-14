import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import Add from "../components/Add";
import List from "../components/List";
import Orders from "../components/Orders";
import Login from "../components/Login";
import Home from "../components/Home";

function AdminPanel() {
  const { adminData, loadingAdmin, sidebarOpen } = useContext(AdminContext);

  if (loadingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading admin panel...
      </div>
    );
  }

  if (!adminData?.email) {
    return <Login />;
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 text-base md:text-lg lg:text-xl"
      style={{ overflow: "hidden" }}
    >
      <Sidebar />

      <div
        className="flex flex-col"
        style={{
          marginLeft: sidebarOpen ? 256 : 64,
          height: "100vh",
          overflowY: "auto",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Nav />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AdminPanel;
