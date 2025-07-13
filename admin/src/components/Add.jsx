import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { useEffect } from "react";

const sizes = ["S", "M", "L", "XL", "XXL"];

export default function Add() {
  const { backend_url, fetchProducts } = useContext(AdminContext);

  const [productData, setProductData] = useState({
    description: "",
    name: "",
    category: "",
    subcategory: "",
    price: "",
    sizes: [],
    isBestseller: false,
    images: [null, null, null, null],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e, index) => {
    const newImages = [...productData.images];
    newImages[index] = e.target.files[0];
    setProductData({ ...productData, images: newImages });
  };

  const handleSizeToggle = (size) => {
    const updatedSizes = productData.sizes.includes(size)
      ? productData.sizes.filter((s) => s !== size)
      : [...productData.sizes, size];
    setProductData({ ...productData, sizes: updatedSizes });
  };

  const handleCheckboxChange = () => {
    setProductData({ ...productData, isBestseller: !productData.isBestseller });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("description", productData.description);
      formData.append("name", productData.name);
      formData.append("category", productData.category);
      formData.append("subcategory", productData.subcategory);
      formData.append("price", productData.price);
      formData.append("sizes", JSON.stringify(productData.sizes));
      formData.append("isBestseller", productData.isBestseller);

      for (let i = 0; i < productData.images.length; i++) {
        if (productData.images[i]) {
          formData.append(`image${i + 1}`, productData.images[i]);
        }
      }

      const response = await axios.post(
        `${backend_url}/api/product/addproduct`,
        formData,
        { withCredentials: true }
      );

      if (response.data) {
        setProductData({
          description: "",
          name: "",
          category: "",
          subcategory: "",
          price: "",
          sizes: [],
          isBestseller: false,
          images: [null, null, null, null],
        });
        await fetchProducts();
        alert("Product submitted. Check console for data.");
        console.log(response.data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
        Add New Product
      </h2>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-6"
      >
        {/* Image Upload Section */}
        <div>
          <label className="block text-base sm:text-lg font-semibold mb-2 text-gray-700">
            Upload Product Images (4)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {productData.images.map((img, index) => (
              <label
                key={index}
                className="relative cursor-pointer border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-28 sm:h-32 bg-gray-50 hover:bg-gray-100"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  name={`image${index + 1}`}
                  multiple
                  onChange={(e) => handleImageChange(e, index)}
                />
                {img ? (
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <img
                    src={assets.upload_icon}
                    alt="Upload"
                    className="h-16 sm:h-20"
                  />
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
            Product Description
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full border rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Write something about the product..."
          />
        </div>

        {/* Product Price */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter product price"
            required
          />
        </div>

        {/* Category and Subcategory */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
              Category
            </label>
            <select
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded-lg text-sm sm:text-base"
            >
              <option value="">Select</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
              Subcategory
            </label>
            <select
              name="subcategory"
              value={productData.subcategory}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded-lg text-sm sm:text-base"
            >
              <option value="">Select</option>
              <option value="TopWear">TopWear</option>
              <option value="DownWear">DownWear</option>
              <option value="WinterWear">WinterWear</option>
            </select>
          </div>
        </div>

        {/* Size Selection */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
            Available Sizes
          </label>
          <div className="flex flex-wrap gap-3">
            {sizes.map((size) => (
              <label key={size} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={productData.sizes.includes(size)}
                  onChange={() => handleSizeToggle(size)}
                  className="accent-blue-600"
                />
                <span className="text-sm sm:text-base">{size}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Bestseller Checkbox */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={productData.isBestseller}
              onChange={handleCheckboxChange}
              className="accent-pink-600"
            />
            <span className="text-gray-700 text-sm sm:text-base">
              Add to Bestseller
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg text-base font-semibold hover:opacity-90 transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
