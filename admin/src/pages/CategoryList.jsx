import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { backendurl } from "../App";
const CategoryList = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const fetchCategories = async () => {
    try {
      const response = await axios.get(backendurl + "/api/category/list");
      if (response.data.success) {
        setCategories(response.data.categories);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const removeCategory = async (id) => {
    try {
      const response = await axios.post(
        backendurl + "/api/category/remove",
        { id },
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchCategories();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <h1 className="mb-2 text-lg font-semibold">All Categories</h1>
      <div className="hidden md:grid grid-cols-[2fr_3fr_1fr] items-center py-2 px-3 border bg-gray-100 border-gray-200 text-sm font-medium">
        <p>Category</p>
        <p>Subcategories</p>
        <p>Actions</p>
      </div>

      {categories.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-[2fr_3fr_1fr]  items-center py-2 px-3 border border-gray-300 text-sm"
        >
          <p>{item.name}</p>
          <p>{item.subCategories.join(", ")}</p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate(`/edit-category/${item._id}`)}
              className="cursor-pointer p-1"
              title="Edit Category"
              aria-label="Edit Category"
            >
              <FaEdit className="size-5 text-blue-600 hover:text-blue-800" />
            </button>

            <button
              className="cursor-pointer p-1"
              title="Delete Category"
              aria-label="Delete Category"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this category?",
                  )
                ) {
                  removeCategory(item._id);
                }
              }}
            >
              <MdDeleteOutline className="size-5 text-red-600 hover:text-red-800" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
