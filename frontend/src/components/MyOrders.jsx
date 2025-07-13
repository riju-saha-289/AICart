// src/component/MyOrders.jsx
import React, { useContext } from "react";
import { Context } from "../context/Context";
import moment from "moment";

export default function MyOrders() {
  const { myOrderData } = useContext(Context); // Ensure myOrderData is loaded in context

  if (!myOrderData?.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xl px-4 text-center">
        You have no orders yet.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 py-10 px-4 sm:px-6 lg:px-12 text-white">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">My Orders</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {myOrderData.map((order) => (
          <div
            key={order._id}
            className="bg-white/10 rounded-xl shadow-lg p-6 sm:p-8 backdrop-blur-md hover:shadow-2xl transition-all border border-white/20 flex flex-col"
          >
            <div className="mb-6 space-y-1 text-sm sm:text-base">
              <div className="text-gray-200 truncate">
                Order ID: <span className="font-mono text-white">{order._id}</span>
              </div>
              <div className="text-gray-300">
                Placed on: {moment(order.createdAt).format("MMMM Do YYYY, h:mm a")}
              </div>
              <div className="text-gray-300">
                Payment:{" "}
                <span className="font-semibold text-white">
                  {order.paymentMethod} ({order.paymentStatus})
                </span>
              </div>
              <div className="text-gray-300">
                Delivery Status:{" "}
                <span
                  className={`font-semibold ${
                    order.isDelivered ? "text-green-400" : "text-yellow-300"
                  }`}
                >
                  {order.status? order.status : "Pending"}
                </span>
              </div>
            </div>

            <div className="space-y-3 max-h-60 sm:max-h-64 overflow-y-auto pr-2">
              {order.orderItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/20 rounded-lg px-4 py-3 text-xs sm:text-sm"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white truncate">{item.name}</div>
                    <div className="text-gray-200">
                      Size: <span className="text-white">{item.size}</span> | Qty:{" "}
                      <span className="text-white">{item.quantity}</span>
                    </div>
                  </div>
                  <div className="font-bold text-yellow-300 mt-2 sm:mt-0 sm:ml-4 whitespace-nowrap">
                    ₹{item.price}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-white/20 pt-5 text-sm sm:text-base flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
              <div className="text-white flex justify-between sm:block">
                <span>Items Total:</span>
                <span className="font-semibold ml-2 sm:ml-0">₹{order.itemsPrice}</span>
              </div>
              <div className="text-white flex justify-between sm:block">
                <span>Shipping:</span>
                <span className="font-semibold ml-2 sm:ml-0">₹{order.shippingPrice}</span>
              </div>
              <div className="text-yellow-400 font-bold text-lg flex justify-between sm:block">
                <span>Total Paid:</span>
                <span className="ml-2 sm:ml-0">₹{order.totalPrice}</span>
              </div>
            </div>

            <div className="mt-6 text-sm sm:text-base text-gray-300 break-words">
              <div>
                Shipping Address:{" "}
                <span className="text-white">
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state} - {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
