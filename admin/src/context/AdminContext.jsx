import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const AdminContext = createContext();
const backend_url = "https://aicart-backend.onrender.com";


function AdminContextProvider({ children }) {
  const [adminData, setAdminData] = useState(null);
  const [loadingAdmin, setLoadingAdmin] = useState(true);

  const [products, setProducts] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getAdmin = async () => {
    setLoadingAdmin(true);
    try {
      const response = await axios.get(`${backend_url}/api/user/getadmin`, {
        withCredentials: true,
      });
      setAdminData(response.data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 400 || error.response.status === 401)
      ) {
        // User is not authenticated as admin - clear admin data
        setAdminData(null);
      } else {
        console.error("Failed to get admin:", error);
      }
    } finally {
      setLoadingAdmin(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backend_url}/api/product/list`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.post(
        `${backend_url}/api/product/remove/${id}`,
        {},
        { withCredentials: true }
      );
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const fetchAllOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await axios.get(`${backend_url}/api/order/admin-orders`, {
        withCredentials: true,
        // If your backend needs headers or params, add here
        // headers: { Authorization: 'Bearer ...' },
        // params: { limit: 20, page: 1 },
      });
      setOrdersData(res.data);
    } catch (err) {
      if (err.response) {
        console.error(
          "Failed to fetch orders:",
          err.response.status,
          err.response.data
        );
      } else {
        console.error("Failed to fetch orders:", err.message);
      }
    } finally {
      setLoadingOrders(false);
    }
  };

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
    getAdmin();
    fetchProducts();
    fetchAllOrders();
  }, []);

  const value = {
    backend_url,
    adminData,
    setAdminData,
    getAdmin,
    loadingAdmin,

    products,
    setProducts,
    fetchProducts,
    removeProduct,

    ordersData,
    setOrdersData,
    loadingOrders,
    fetchAllOrders,
    updateOrderStatus,

    sidebarOpen,
    setSidebarOpen,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export { AdminContext, AdminContextProvider };
