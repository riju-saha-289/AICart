
import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context";
import { Truck, CheckCircle } from "lucide-react";
import razorpayLogo from "../assets/razorpaycover.avif";
import { useNavigate } from "react-router";

export default function PlaceOrder() {
  console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_API_KEY);

  const navigate = useNavigate();
  const {
    cartItem,
    products,
    currency,
    delivery_fee,
    placeOrder,
    backend_url,
  } = useContext(Context);

  // ---------- Build order summary ----------
  const getProduct = (id) => products.find((p) => p._id === id);
  const cartItemsArray = [];
  let subtotal = 0;

  for (const productId in cartItem) {
    const product = getProduct(productId);
    if (!product) continue;

    for (const size in cartItem[productId]) {
      const quantity = cartItem[productId][size];
      const price = product.price * quantity;
      subtotal += price;

      cartItemsArray.push({
        ...product,
        size,
        quantity,
        total: price,
      });
    }
  }

  const totalAmount = subtotal + delivery_fee;

  // ---------- Local state ----------
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    paymentMethod: "", // "Cash on Delivery" | "Razorpay"
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const isFormValid = () => Object.values(form).every((v) => v.trim() !== "");

  // ---------- Load Razorpay script ----------
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (document.getElementById("razorpay-sdk")) return resolve(true);
      const script = document.createElement("script");
      script.id = "razorpay-sdk";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  // ---------- Main submit ----------
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!isFormValid()) {
      setErrorMsg("Please fill all fields.");
      return;
    }
    setLoading(true);

    /* Build common order payload */
    const orderData = {
      userDetails: form,
      items: cartItemsArray.map(({ _id, name, size, quantity, price }) => ({
        _id,
        name,
        size,
        quantity,
        price,
      })),
      subtotal,
      delivery_fee,
      totalAmount,
      paymentMethod: form.paymentMethod,
    };

    try {
      // ------- 1️⃣ Cash on Delivery -------
      if (form.paymentMethod === "Cash on Delivery") {
        console.log("🧾 COD order payload ->", orderData);
        await placeOrder(orderData);
        setOrderPlaced(true);
        navigate("/orders");
        return;
      }

      // ------- 2️⃣ Razorpay flow -------
      const { data: razorpayOrder } = await axios.post(
        `${backend_url}/api/order/razorpay`,
        { amount: totalAmount * 100, currency: "INR" },
        { withCredentials: true }
      );

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error("Failed to load Razorpay");

      const options = {   
        key: import.meta.env.VITE_RAZORPAY_API_KEY,// <== test key id
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "AICart Store",
        description: "Order payment",
        image: razorpayLogo,
        order_id: razorpayOrder.id,
        handler: async (resp) => {
          /* Merge payment_id into payload */
          const finalPayload = {
            ...orderData,
            razorpay_payment_id: resp.razorpay_payment_id,
          };
          console.log("🧾 Razorpay order payload ->", finalPayload);
          await placeOrder(finalPayload);
          setOrderPlaced(true);
          navigate("/orders");
        },
        prefill: {
          name: form.fullName,
          contact: form.phone,
        },
        theme: { color: "#6366f1" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-[70px] bg-gradient-to-tr from-purple-100 via-white to-blue-100 px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 md:p-12">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
          Place Your Order
        </h2>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          noValidate
        >
          {/* Left: Address / payment form */}
          <div className="space-y-6">
            {[
              { name: "fullName", label: "Full Name" },
              { name: "phone", label: "Phone Number" },
              { name: "address", label: "Address" },
              { name: "city", label: "City" },
              { name: "state", label: "State" },
              { name: "postalCode", label: "Postal Code" },
              { name: "country", label: "Country" },
            ].map(({ name, label }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block font-semibold text-gray-700 mb-1"
                >
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full border-2 border-indigo-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  required
                />
              </div>
            ))}

            {/* Payment selector */}
            <fieldset>
              <legend className="text-gray-700 font-semibold mb-2">
                Payment Method
              </legend>
              <div className="flex gap-4 flex-wrap">
                {[
                  { value: "Cash on Delivery", label: "Cash on Delivery" },
                  { value: "Razorpay", label: "Razorpay", img: razorpayLogo },
                ].map(({ value, label, img }) => (
                  <label
                    key={value}
                    className={`flex items-center gap-3 px-4 py-2 rounded-xl border-2 cursor-pointer transition
                    ${
                      form.paymentMethod === value
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={value}
                      checked={form.paymentMethod === value}
                      onChange={handleChange}
                      className="accent-indigo-600"
                    />
                    {img ? (
                      <img src={img} alt={label} className="h-6" />
                    ) : (
                      label
                    )}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Errors & CTA */}
            {errorMsg && <p className="text-red-600 font-medium">{errorMsg}</p>}

            <button
              type="submit"
              disabled={!isFormValid() || loading}
              className={`w-full py-3 rounded-xl text-white font-bold shadow-md transition duration-300
                ${
                  isFormValid() && !loading
                    ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-pink-600 hover:to-indigo-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              {loading ? (
                "Placing Order..."
              ) : (
                <>
                  <Truck className="inline-block mr-2" /> Place Order
                </>
              )}
            </button>

            {orderPlaced && (
              <div className="flex items-center gap-3 text-green-700 font-semibold mt-4">
                <CheckCircle /> Your order has been placed successfully!
              </div>
            )}
          </div>

          {/* Right: order summary */}
          <div className="bg-indigo-50 rounded-2xl p-6 shadow-inner h-fit">
            <h3 className="text-xl font-bold text-indigo-800 mb-4">
              Order Summary
            </h3>
            <ul className="space-y-4 max-h-80 overflow-y-auto">
              {cartItemsArray.map((item, i) => (
                <li key={i} className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-indigo-900">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Size: {item.size} | Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-indigo-800">
                    {currency} {item.total.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>

            <hr className="my-4 border-indigo-200" />

            <div className="space-y-2 text-indigo-900 font-semibold">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {currency} {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>
                  {currency} {delivery_fee.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-2">
                <span>Total</span>
                <span>
                  {currency} {totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
