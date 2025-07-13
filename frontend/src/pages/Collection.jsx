import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";
import Card from "../components/Card";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Title from "../components/Title";

const categories = ["Men", "Women", "Kids"];
const subcategories = ["TopWear", "DownWear", "WinterWear"];

export default function Collections() {
  const { products, search, searchOpen } = useContext(Context);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");
  const [showFilter, SetShowFilter] = useState(false);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSortType("relavent");
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subcategory));
    }

    if (searchOpen && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortType === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProduct(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, sortType, products, search, searchOpen]);

  return (
    <>
      <style>
        {`
          @media (max-width: 767px) {
            aside {
              position: static !important;
              height: auto !important;
              overflow: visible !important;
            }

            .main-content-scroll {
              max-height: none !important;
              overflow-y: visible !important;
            }

            .page-wrapper {
              height: auto !important;
              overflow: visible !important;
            }
          }
        `}
      </style>

      <div
        className="page-wrapper w-full min-h-screen  flex flex-col md:flex-row relative z-10 pb-[110px]"
        style={{
          background:
            "linear-gradient(135deg, #1e293b 0%, #0f172a 40%, #134e4a 70%, #0f172a 100%)",
        }}
      >
        {/* Sidebar */}
        <aside
          className={`
            md:w-[30vw] lg:w-[20vw] w-full
            ${showFilter ? "h-auto" : "h-[60px]"}
            md:h-auto
            transition-all duration-300 bg-[#1b1e22] z-20 border-r border-gray-700 text-[#aaf5fa] p-5
            ${showFilter ? "lg:fixed lg:top-[70px] lg:h-[calc(100vh-70px)]" : ""}
            md:relative md:top-0 md:h-auto
          `}
          style={{
            overflow: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>
            {`
              aside::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

          <p
            className="text-xl font-semibold flex items-center justify-between cursor-pointer md:cursor-default md:justify-start md:gap-3"
            onClick={() => SetShowFilter((prev) => !prev)}
            style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
          >
            Filters
            <span className="md:hidden">
              {showFilter ? (
                <FaChevronDown className="text-[18px]" />
              ) : (
                <FaChevronRight className="text-[18px]" />
              )}
            </span>
          </p>

          <div className={`mt-5 ${showFilter ? "block" : "hidden"} md:block`}>
            <div className="border border-gray-500 rounded-md bg-slate-700 p-4 mb-6">
              <p
                className="text-lg mb-3 font-semibold text-white"
                style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.125rem)" }}
              >
                CATEGORIES
              </p>
              <div className="flex flex-col gap-3 max-h-48 overflow-auto">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 text-sm font-light cursor-pointer"
                    style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)" }}
                  >
                    <input
                      type="checkbox"
                      value={cat}
                      checked={category.includes(cat)}
                      className="w-4 h-4 accent-cyan-400"
                      onChange={toggleCategory}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="border border-gray-500 rounded-md bg-slate-700 p-4 mb-6">
              <p
                className="text-lg mb-3 font-semibold text-white"
                style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.125rem)" }}
              >
                SUB-CATEGORIES
              </p>
              <div className="flex flex-col gap-3 max-h-48 overflow-auto">
                {subcategories.map((subcat) => (
                  <label
                    key={subcat}
                    className="flex items-center gap-2 text-sm font-light cursor-pointer"
                    style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)" }}
                  >
                    <input
                      type="checkbox"
                      value={subcat}
                      checked={subCategory.includes(subcat)}
                      className="w-4 h-4 accent-cyan-400"
                      onChange={toggleSubCategory}
                    />
                    {subcat}
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-md transition"
              style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.125rem)" }}
            >
              Clear Filters
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div
          className={`main-content-scroll flex-1 w-full px-5 md:px-10 overflow-y-auto overflow-x-hidden ${
            showFilter ? "lg:ml-[20vw]" : ""
          }`}
          style={{
            maxHeight: "calc(100vh - 70px)",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>
            {`
              div::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

          <div className="p-5 flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-4 text-center">
            <Title
              text1="ALL"
              text2="COLLECTIONS"
              style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }}
            />
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="bg-slate-700 w-full sm:w-1/2 md:w-[220px] h-[45px] px-3 text-white rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}
            >
              <option value="relavent">Sort by: Relevance</option>
              <option value="low-high">Sort by: Price Low to High</option>
              <option value="high-low">Sort by: Price High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          <div
            className="px-5 pb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center"
            style={{ rowGap: "1.5rem", columnGap: "1.5rem" }}
          >
            {filterProduct.length === 0 ? (
              <p
                className="col-span-full text-center text-gray-300"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
              >
                No products match your filters.
              </p>
            ) : (
              filterProduct.map((product) => (
                <Card
                  key={product._id}
                  name={product.name || "Clothes"}
                  image={product.images[0]}
                  price={product.price}
                  id={product._id}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
