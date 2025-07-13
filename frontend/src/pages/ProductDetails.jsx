import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/Context";
import RelatedProducts from "../components/RelatedProducts";

export default function ProductDetails() {
  const { productId } = useParams();
  const { products, currency, addToCart, userData } = useContext(Context);

  const [ProductData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [size, setSize] = useState("");
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    const found = products.find((item) => item._id === productId);
    if (found) {
      setProductData(found);
      setImage1(found.images[0]);
      setImage2(found.images[1]);
      setImage3(found.images[2]);
      setImage4(found.images[3]);
      setImage(found.images[0]);
    }
  }, [productId, products]);

  const rating = 4.5;
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  return ProductData ? (
    <div className="min-h-screen pt-[70px] px-6 md:px-20 py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Left Thumbnails */}
        <div className="hidden lg:flex flex-col gap-4">
          {[image1, image2, image3, image4].map(
            (img, i) =>
              img && (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={() => setImage(img)}
                  className={`w-20 h-20 rounded-md cursor-pointer border-2 ${
                    image === img ? "border-cyan-400" : "border-transparent"
                  } object-cover`}
                />
              )
          )}
        </div>

        {/* Main Image and Small Thumbs */}
        <div className="flex flex-col">
          <div className="flex-shrink-0 w-full max-w-md lg:max-w-none lg:w-[400px] h-[320px] rounded-xl overflow-hidden bg-gray-800 p-4 shadow-2xl">
            <img
              src={image}
              alt="Main product"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>

          {/* Mobile thumbnails */}
          <div className="lg:hidden mt-4 flex flex-wrap justify-center gap-4">
            {[image1, image2, image3, image4].map(
              (img, i) =>
                img && (
                  <img
                    key={"sm-" + i}
                    src={img}
                    alt={`thumb-sm-${i}`}
                    onClick={() => setImage(img)}
                    className={`w-20 h-20 rounded-md cursor-pointer border-2 ${
                      image === img ? "border-cyan-400" : "border-transparent"
                    } object-cover`}
                  />
                )
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col flex-1 space-y-6">
          <h1 className="text-4xl font-bold text-cyan-400">{ProductData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(fullStars)].map((_, i) => (
              <svg
                key={"full-" + i}
                xmlns="http://www.w3.org/2000/svg"
                fill="yellow"
                viewBox="0 0 24 24"
                stroke="none"
                className="w-6 h-6"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
            {halfStar && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="yellow"
                viewBox="0 0 24 24"
                stroke="none"
                className="w-6 h-6"
              >
                <defs>
                  <linearGradient id="half-grad">
                    <stop offset="50%" stopColor="yellow" />
                    <stop offset="50%" stopColor="gray" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#half-grad)"
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
            )}
            <span className="text-gray-400 ml-2 font-semibold">{rating.toFixed(1)}</span>
          </div>

          {/* Price */}
          <p className="text-2xl font-semibold text-white">
            {currency} {ProductData.price}
          </p>

          {/* Description */}
          <p className="text-gray-300 max-w-lg">
            {ProductData.description}
            <br />
            <span className="italic font-semibold">
              And Stylish, breathable cotton shirt with a modern slim fit. Easy to waveShaperNode,
              super comfortable, and designed for effortless style.
            </span>
          </p>

          {/* Size Selection */}
          <div className="space-y-2 max-w-xs">
            <p className="text-sm text-gray-400 font-semibold">Select Size:</p>
            <div className="flex flex-wrap gap-3">
              {ProductData.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-md text-sm font-medium border ${
                    size === s
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  } transition`}
                >
                  {s}
                </button>
              ))}
            </div>
            {cartMessage && (
              <p className="text-red-400 text-sm mt-1">{cartMessage}</p>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => {
              if (!size) {
                setCartMessage("Please select a size before adding to cart.");
                setTimeout(() => setCartMessage(""), 3000);
                return;
              }
              addToCart(productId, size);
              setCartMessage("Added to cart!");
              setTimeout(() => setCartMessage(""), 3000);
            }}
            className="w-40 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-md text-lg font-semibold transition"
          >
            Add to Cart
          </button>

          {/* Extras */}
          <div className="flex flex-col gap-2 text-sm text-gray-400 max-w-xs">
            <p>100% Original</p>
            <p>Cash on delivery available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description + Reviews Table */}
      <div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ height: "300px" }}>
        <table
          className="w-full text-left border-collapse border border-gray-700 rounded-md overflow-hidden h-full"
          style={{ tableLayout: "fixed" }}
        >
          <thead className="bg-gray-800 text-cyan-400" style={{ height: "30%" }}>
            <tr>
              <th className="px-6 py-3 border border-gray-700">Description</th>
              <th className="px-6 py-3 border border-gray-700">Reviews (146)</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 text-gray-300 align-top">
            <tr>
              <td colSpan={2} className="px-6 py-4 border border-gray-700 align-top overflow-auto">
                Upgrade your wardrobe with this stylish slim-fit cotton shirt,
                available now on AICart. Crafted from breathable, high-quality
                fabric, it offers all-day comfort and comfortless style. Easy to
                maintain and perfect for any setting, this clothes is a must-have
                essential for those who value both fashion and function.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <RelatedProducts
        currentProductId={ProductData._id}
        category={ProductData.category}
        subcategory={ProductData.subcategory}
      />
    </div>
  ) : (
    <div className="opacity-0">Loading...</div>
  );
}
