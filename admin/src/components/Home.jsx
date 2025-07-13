import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

export default function Home() {
  const { products, ordersData } = useContext(AdminContext);

  const totalItems = products.length;
  const pendingOrders = ordersData.filter(
    (order) => order.status !== "Delivered"
  ).length;

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6 px-3">
      <div className="text-center bg-white p-5 sm:p-10 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-xl sm:text-3xl font-semibold text-indigo-700 mb-4">
          Welcome!
        </h1>

        <p className="text-gray-600 text-sm sm:text-lg mb-6">
          You are logged in as{" "}
          <span className="font-medium text-indigo-600">Admin</span>.
        </p>

        <div className="flex flex-col xs:flex-row justify-center items-center gap-5 sm:gap-10">
          <div className="text-center">
            <p className="text-2xl sm:text-4xl font-bold text-indigo-700">{totalItems}</p>
            <p className="text-gray-600 text-xs sm:text-base">Total Items</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-4xl font-bold text-pink-600">{pendingOrders}</p>
            <p className="text-gray-600 text-xs sm:text-base">Pending Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
}
