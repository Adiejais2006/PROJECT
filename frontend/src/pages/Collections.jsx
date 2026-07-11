import React, { useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { useContext } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
const Collections = () => {
  const { products, search, showSearch, backendurl } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(backendurl + "/api/category/list");

      if (response.data.success) {
        setCategoriesData(response.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const toggleSubcategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubcategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSize = (e) => {
    if (selectedSizes.includes(e.target.value)) {
      setSelectedSizes((prev) =>
        prev.filter((size) => size !== e.target.value),
      );
    } else {
      setSelectedSizes((prev) => [...prev, e.target.value]);
    }
  };
  const [sortType, setSortType] = useState("relevant");
  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }
    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subcategory.includes(item.subCategory),
      );
    }
    if (priceRange) {
      switch (priceRange) {
        case "0-500":
          productsCopy = productsCopy.filter(
            (item) => item.price >= 0 && item.price <= 500,
          );
          break;

        case "500-1000":
          productsCopy = productsCopy.filter(
            (item) => item.price > 500 && item.price <= 1000,
          );
          break;

        case "1000-2000":
          productsCopy = productsCopy.filter(
            (item) => item.price > 1000 && item.price <= 2000,
          );
          break;

        case "2000+":
          productsCopy = productsCopy.filter((item) => item.price > 2000);
          break;

        default:
          break;
      }
    }
    if (selectedSizes.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        item.sizes.some((size) => selectedSizes.includes(size)),
      );
    }
    switch (sortType) {
      case "low-high":
        productsCopy.sort((a, b) => a.price - b.price);
        break;

      case "high-low":
        productsCopy.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }

    setFilterProducts(productsCopy);
  };
  useEffect(() => {
    applyFilter();
  }, [
    category,
    subcategory,
    priceRange,
    selectedSizes,
    search,
    showSearch,
    products,
    sortType,
  ]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const availableSubcategories =
    category.length === 0
      ? [...new Set(categoriesData.flatMap((item) => item.subCategories))]
      : [
          ...new Set(
            categoriesData
              .filter((item) => category.includes(item.name))
              .flatMap((item) => item.subCategories),
          ),
        ];
  useEffect(() => {
    setSubcategory((prev) =>
      prev.filter((sub) => availableSubcategories.includes(sub)),
    );
  }, [category, categoriesData]);
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200">
      {/* Filter Options */}
      <div className=" min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""} `}
            src={assets.dropdown_icon}
            alt="Filter"
          />
        </p>
        {/* CATEROGTY FILTER   */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block `}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gary-700">
            {categoriesData.map((item) => (
              <p key={item._id} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={item.name}
                  onChange={toggleCategory}
                />
                {item.name}
              </p>
            ))}
          </div>
        </div>
        {/* SUb Category filtyer */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block `}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gary-700">
            {availableSubcategories.map((sub) => (
              <p key={sub} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={sub}
                  onChange={toggleSubcategory}
                />
                {sub}
              </p>
            ))}
          </div>
        </div>
        {/* PRICE FILTER */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">PRICE</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                value=""
                checked={priceRange === ""}
                onChange={(e) => setPriceRange(e.target.value)}
              />
              All
            </label>

            <label className="flex gap-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                value="0-500"
                checked={priceRange === "0-500"}
                onChange={(e) => setPriceRange(e.target.value)}
              />
              ₹0 - ₹500
            </label>

            <label className="flex gap-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                value="500-1000"
                checked={priceRange === "500-1000"}
                onChange={(e) => setPriceRange(e.target.value)}
              />
              ₹500 - ₹1000
            </label>

            <label className="flex gap-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                value="1000-2000"
                checked={priceRange === "1000-2000"}
                onChange={(e) => setPriceRange(e.target.value)}
              />
              ₹1000 - ₹2000
            </label>

            <label className="flex gap-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                value="2000+"
                checked={priceRange === "2000+"}
                onChange={(e) => setPriceRange(e.target.value)}
              />
              ₹2000+
            </label>
          </div>
        </div>
        {/* SIZE FILTER */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">SIZE</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <label key={size} className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={size}
                  checked={selectedSizes.includes(size)}
                  onChange={toggleSize}
                />
                {size}
              </label>
            ))}
          </div>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="flex-1">
        <div className=" flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* PRODUCT SORT */}

          <select
            value={sortType}
            className="border border-gray-300 text-sm px-2"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high"> Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* MAP PRODUCTS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
