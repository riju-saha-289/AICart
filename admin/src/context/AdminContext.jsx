import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const AdminContext = createContext();
const backend_url = "https://aicart-backend.onrender.com";

function AdminContextProvider({ children }) {
  const [adminData, setAdminData] = useState(null);
  const [products, setProducts] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Sidebar open/close state
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Fetch admin info
  const getAdmin = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/user/getadmin`, {
        withCredentials: true,
      });
      setAdminData(response.data);
    } catch (error) {
      console.error("Failed to get admin:", error);
      setAdminData(null);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backend_url}/api/product/list`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  // Remove product with confirmation
  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.post(`${backend_url}/api/product/remove/${id}`, {}, { withCredentials: true });
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Fetch all orders (admin)
  const fetchAllOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await axios.get(`${backend_url}/api/order/admin-orders`, {
        withCredentials: true,
      });
      setOrdersData(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Update order status and update local state instantly
  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await axios.put(
        `${backend_url}/api/order/admin-orders/${orderId}/status`,
        { status },
        { withCredentials: true }
      );

      setOrdersData((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status,
                isDelivered: status === "Delivered",
                updatedAt: Date.now(),
              }
            : order
        )
      );

      return res.data;
    } catch (err) {
      console.error("Failed to update order status:", err);
      throw err;
    }
  };

  useEffect(() => {
    // getAdmin();
    fetchProducts();
    fetchAllOrders();
  }, []);

  const value = {
    backend_url,
    adminData,
    setAdminData,
    getAdmin,

    products,
    setProducts,
    fetchProducts,
    removeProduct,

    ordersData,
    setOrdersData,
    loadingOrders,
    fetchAllOrders,
    updateOrderStatus,

    // Sidebar state & setter
    sidebarOpen,
    setSidebarOpen,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export { AdminContext, AdminContextProvider };
