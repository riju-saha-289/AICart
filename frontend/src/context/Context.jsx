import { createContext, useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const Context = createContext(null);

function ContextProvider({ children }) {
  const backend_url = "https://aicart-backend.onrender.com";

  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const [cartItem, setCartItem] = useState({});
  const [cartCount, setCartCount] = useState(0);

  const [myOrderData, setMyOrderData] = useState(null);

  const currency = "₹";
  const delivery_fee = 40;

  // Fetch logged-in user info
  const getCurrentUser = async () => {
    try {
      const result = await axios.get(`${backend_url}/api/user/currentuser`, {
        withCredentials: true,
      });
      setUserData(result.data);
    } catch {
      setUserData(null);
    } finally {
      setLoadingUser(false);
    }
  };

  // logout
  const logout = async () => {
  try {
    await axios.get(`${backend_url}/api/Auth/logout`, {
      withCredentials: true,
    });
    setUserData(null);
    setCartItem({});
    setCartCount(0);
    setMyOrderData([]);
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

  // Fetch products
  const getProducts = async () => {
    try {
      const result = await axios.get(`${backend_url}/api/product/list`);
      setProducts(result.data);
    } catch (error) {
      console.error("Get products error:", error);
    }
  };

  // Fetch cart
  const getUserCart = async () => {
    try {
      const result = await axios.get(`${backend_url}/api/cart/get`, {
        withCredentials: true,
      });
      setCartItem(result.data || {});
    } catch (error) {
      console.error("Get user cart error:", error);
    }
  };

  // Add to cart
  const addToCart = async (productId, size) => {
    if (!size) {
      console.log("Please select a product size");
      return;
    }

    let cartData = structuredClone(cartItem);

    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] += 1;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = { [size]: 1 };
    }

    setCartItem(cartData);

    try {
      await axios.post(
        `${backend_url}/api/cart/add`,
        { productId, size },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  // Update quantity
  const updateQuantity = async (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    try {
      let cartData = structuredClone(cartItem);
      if (!cartData[productId]) cartData[productId] = {};
      cartData[productId][size] = quantity;

      setCartItem(cartData);

      await axios.post(
        `${backend_url}/api/cart/update`,
        { productId, size, quantity },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Update cart quantity error:", error);
    }
  };

  // Remove from cart
  const removeFromCart = async (productId, size = null) => {
    let updatedCart = structuredClone(cartItem);

    if (!updatedCart[productId]) return;

    if (size) {
      delete updatedCart[productId][size];
      if (Object.keys(updatedCart[productId]).length === 0) {
        delete updatedCart[productId];
      }
    } else {
      delete updatedCart[productId];
    }

    setCartItem(updatedCart);

    try {
      await axios.post(
        `${backend_url}/api/cart/remove`,
        { productId, size },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Remove from cart error:", error);
    }
  };

  // Calculate cart count
  const getCartCount = () => {
    let total = 0;
    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        if (cartItem[productId][size] > 0) {
          total += cartItem[productId][size];
        }
      }
    }
    setCartCount(total);
  };

  // Place order
 
  const placeOrder = async ({
    items,
    userDetails,
    subtotal,
    delivery_fee,
    totalAmount,
    paymentMethod,
    razorpay_payment_id, // may be undefined (COD)
  }) => {
    try {
      const orderItems = items.map((item) => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        size: item.size,
        price: item.price,
      }));

      const shippingAddress = {
        address: userDetails.address,
        city: userDetails.city,
        state: userDetails.state,
        postalCode: userDetails.postalCode,
        country: userDetails.country,
      };

      const payload = {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: subtotal,
        shippingPrice: delivery_fee,
        totalPrice: totalAmount,
        razorpay_payment_id, // undefined for COD
      };

      const { data } = await axios.post(
        `${backend_url}/api/order/place`,
        payload,
        { withCredentials: true }
      );
      await getUserCart(); // clear local cart
      await myOrder()
      return data;
    } catch (error) {
      console.error(
        "Place order failed:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  // myorder
  const myOrder = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/order/myorder`, {
        withCredentials: true,
      });
      console.log(response);
      if (response.data) {
        setMyOrderData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
    getProducts();
    getUserCart();
    myOrder();
  }, []);

  useEffect(() => {
    getCartCount();
  }, [cartItem]);

  const value = {
    backend_url,
    userData,
    setUserData,
    loadingUser,
    getCurrentUser,
    logout,

    currency,
    delivery_fee,

    products,
    setProducts,
    getProducts,

    search,
    setSearch,
    searchOpen,
    setSearchOpen,

    cartItem,
    addToCart,
    updateQuantity,
    removeFromCart,
    cartCount,

    placeOrder,
    myOrderData,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, ContextProvider };
