import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import moment from "moment";

export default function Orders() {
  const { ordersData, loadingOrders, updateOrderStatus } = useContext(AdminContext);

  const statusHandler = async (e, order) => {
    const newStatus = e.target.value;
    try {
      await updateOrderStatus(order._id, newStatus);
    } catch {
      alert("Failed to update status");
    }
  };

  if (loadingOrders) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 text-white text-lg sm:text-xl">
        Loading your orders...
      </div>
    );
  }

  if (!ordersData || ordersData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 text-white text-lg sm:text-xl px-4 text-center">
        No orders found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 p-4 sm:p-8 md:p-12 text-white max-w-screen-xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center tracking-wide">Admin Orders</h1>

      <div className="space-y-6">
        {ordersData.map((order, idx) => (
          <div
            key={order._id}
            className="bg-white/10 rounded-xl shadow-lg p-5 backdrop-blur-md border border-white/20"
          >
            <p className="font-semibold text-white mb-1 text-base sm:text-lg">Order #{idx + 1}</p>
            <p className="break-words text-white mb-2 text-sm sm:text-base">ID: {order._id}</p>

            <div className="mb-3 max-h-36 overflow-y-auto space-y-1">
              {order.orderItems.map((item, i) => (
                <p key={i} className="text-sm sm:text-base text-white truncate">
                  {item.name} x {item.quantity}
                </p>
              ))}
            </div>

            <p className="text-white mb-2 text-sm sm:text-base">
              <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.state} - {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>

            {/* Payment Details */}
            <div className="mb-2 text-sm sm:text-base">
              <strong>Payment Method:</strong> {order.paymentMethod || "N/A"}
            </div>

            <div className="mb-2 text-sm sm:text-base">
              <strong>Payment Status:</strong>{" "}
              <span
                className={
                  order.paymentStatus === "paid"
                    ? "text-green-400"
                    : order.paymentStatus === "pending"
                    ? "text-yellow-300"
                    : "text-red-400"
                }
              >
                {order.paymentStatus || "Unknown"}
              </span>
            </div>

            {order.payment_id && (
              <div className="mb-2 text-xs sm:text-sm text-gray-300 break-all">
                <strong>Payment ID:</strong> {order.payment_id}
              </div>
            )}

            <p className="text-yellow-300 font-semibold mb-2 text-base sm:text-lg">Total: ₹{order.totalPrice}</p>

            <p className="mb-2 text-sm sm:text-base">
              <strong>Status:</strong>{" "}
              <span className={order.isDelivered ? "text-green-400" : "text-yellow-300"}>
                {order.status || (order.isDelivered ? "Delivered" : "Pending")}
              </span>
            </p>

            <p className="mb-4 text-xs sm:text-sm text-gray-300">
              <strong>Placed On:</strong> {moment(order.createdAt).format("MMM Do YYYY, h:mm a")}
            </p>

            <select
              className="bg-gray-800 text-white rounded px-3 py-2 w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              value={order.status || (order.isDelivered ? "Delivered" : "Packing")}
              onChange={(e) => statusHandler(e, order)}
            >
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
