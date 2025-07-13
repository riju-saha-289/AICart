import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Registration from "./pages/Registration";
import LoginPage from "./pages/Login";
import Nav from "./components/Nav";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Collection from "./pages/Collection";
import Product from "./pages/Product";
import { Context } from "./context/Context";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/placeOrder";
import MyOrders from "./components/MyOrders";
import Ai from "./components/Ai";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { userData, loadingUser } = useContext(Context);

  if (loadingUser) {
    return (
      <div className="flex justify-center items-center h-screen text-white bg-black">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Nav />
      <Routes>
        {userData ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/product" element={<Product />} />
            <Route path="/productdetails/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/registration" element={<Navigate to="/" />} />
            <Route path="/placeorder" element={<PlaceOrder/>} />
            <Route path="/orders" element={<MyOrders/>} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
      <Ai/>
    </>
  );
}
