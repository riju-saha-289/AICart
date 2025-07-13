import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { Trash2 } from "lucide-react";

export default function List() {
  const { products, removeProduct } = useContext(AdminContext);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800 text-center">
        Product List
      </h2>

      {/* Table View for screen ≥ 430px */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
          <thead className="bg-indigo-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {products.map((product) => (
              <tr key={product._id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={product.images[0]}
                    alt="product"
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>
                <td className="p-3 max-w-xs">{product.description}</td>
                <td className="p-3">₹{product.price}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => removeProduct(product._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 className="inline-block" size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card View for small screens (< 430px) */}
      <div className="sm:hidden flex flex-col gap-4 mt-4">
        {products.length === 0 ? (
          <div className="text-center text-gray-500 text-sm">
            No products found.
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow rounded-md p-4 flex flex-col gap-3 text-sm w-full"
            >
              <img
                src={product.images[0]}
                alt="product"
                className="w-full h-44 object-cover rounded-md"
              />

              <p className="text-base font-semibold text-gray-800 break-words w-full">
                {product.description}
              </p>

              <p className="text-gray-600 text-sm w-full">
                <span className="font-medium">Category:</span> {product.category}
              </p>

              <p className="text-indigo-600 font-semibold text-lg w-full">
                ₹{product.price}
              </p>

              <div className="w-full flex justify-end">
                <button
                  onClick={() => removeProduct(product._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
