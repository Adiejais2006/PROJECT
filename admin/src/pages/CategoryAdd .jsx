import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendurl } from "../App";
import { useNavigate, useParams } from "react-router-dom";
const CategoryAdd = ({ token }) => {
  const [name, setName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const addCategory = async () => {
    try {
      if (!name.trim()) {
        return toast.error("Category name is required");
      }
      if (subCategories.length === 0) {
        return toast.error("Add at least one subcategory");
      }
      const response = await axios.post(
        backendurl + "/api/category/add",
        {
          name,
          subCategories,
        },
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setSubCategory("");
        setSubCategories([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const updateCategory = async () => {
    try {
      if (!name.trim()) {
        return toast.error("Category name is required");
      }

      if (subCategories.length === 0) {
        return toast.error("Add at least one subcategory");
      }

      const response = await axios.put(
        backendurl + `/api/category/update/${id}`,
        {
          name,
          subCategories,
        },
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setSubCategory("");
        setName("");
        setSubCategories([]);
        navigate("/list-category");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const fetchCategory = async () => {
    try {
      const response = await axios.get(backendurl + "/api/category/list");

      if (response.data.success) {
        const category = response.data.categories.find(
          (item) => item._id === id,
        );

        if (!category) {
          toast.error("Category not found");
          navigate("/list-category");
          return;
        }

        setName(category.name);
        setSubCategories(category.subCategories);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (isEditMode) {
      fetchCategory();
    }
  }, [id, isEditMode]);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-5">
        {isEditMode ? "Update Category" : "Add Category"}
      </h2>
      <div className="w-full max-w-md">
        <p className="mb-2">Category Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div className="w-full max-w-md mt-5">
        <p className="mb-2">Subcategory</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            placeholder="Enter subcategory"
            className="flex-1 border px-3 py-2 rounded"
          />
          <button
            type="button"
            onClick={() => {
              const value = subCategory.trim();
              if (
                !value ||
                subCategories.some(
                  (item) => item.toLowerCase() === value.toLowerCase(),
                )
              )
                return;
              setSubCategories((prev) => [...prev, value]);
              setSubCategory("");
            }}
            className="bg-black text-white px-4 rounded"
          >
            Add
          </button>
        </div>
        {subCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {subCategories.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full"
              >
                <span>{item}</span>

                <button
                  type="button"
                  onClick={() =>
                    setSubCategories((prev) =>
                      prev.filter((_, i) => i !== index),
                    )
                  }
                  className="text-red-600 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={isEditMode ? updateCategory : addCategory}
          className="bg-black text-white px-6 py-2 rounded mt-5"
        >
          {isEditMode ? "Update Category" : "Add Category"}
        </button>
      </div>
    </div>
  );
};

export default CategoryAdd;
