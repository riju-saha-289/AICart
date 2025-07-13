import React, { useContext } from "react";
import { Context } from "../context/Context";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate=useNavigate()
  const {
    cartItem,
    updateQuantity,
    removeFromCart,
    products,
    currency,
    delivery_fee,
  } = useContext(Context);

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

  return (
    <div className="min-h-screen pt-[70px] bg-gradient-to-tr from-blue-100 via-white to-blue-200">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Shopping Cart</h2>

        {cartItemsArray.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-lg">Your cart is empty 😕</p>
            <Link
              to="/collection"
              className="mt-4 inline-block text-blue-600 hover:underline"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItemsArray.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white rounded-lg shadow p-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-2/3">
                  <img
                    src={item.images?.[0] || item.image || "/placeholder.png"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded border"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="text-sm text-gray-500">Price: {currency} {item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item._id, item.size, Math.max(1, item.quantity - 1))}
                    className="w-8 h-8 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="min-w-[30px] text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                    className="w-8 h-8 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-700">{currency} {item.total}</p>
                  <button
                    onClick={() => removeFromCart(item._id, item.size)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="border-t pt-6 mt-6 text-right">
              <p className="text-gray-700 mb-1">
                Subtotal: <span className="font-semibold">{currency} {subtotal}</span>
              </p>
              <p className="text-gray-700 mb-1">
                Delivery Fee: <span className="font-semibold">{currency} {delivery_fee}</span>
              </p>
              <p className="text-xl font-bold">
                Total: {currency} {totalAmount}
              </p>
              <button
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() =>navigate('/placeorder') }
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
