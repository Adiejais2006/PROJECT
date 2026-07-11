import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import React, { useEffect } from "react";
import { useState } from "react";
import { backendurl } from "../App";
import axios from "axios";
import { currency } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const List = ({ token }) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(backendurl + "/api/product/list");
      setList(response.data.products);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendurl + "/api/product/remove",
        {
          id,
        },
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* -----------------LIST TABLE TITLE ----------------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center  py-1 px-2 border border-gray-100 bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Stock</b>
          <b className="text-center">Action</b>
        </div>

        {/* ---------------------PRODUCT LIST ------------------- */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-200 text-sm"
            key={index}
          >
            <img className="w-12" src={item.image[0]} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p
              className={`font-semibold ${
                item.stock === 0
                  ? "text-red-600"
                  : item.stock <= 5
                    ? "text-yellow-600"
                    : "text-green-600"
              }`}
            >
              {item.stock === 0 ? "Out of Stock" : item.stock}
            </p>
            <div className="flex  justify-center items-center gap-2">
              <p
                onClick={() => navigate(`/edit/${item._id}`)}
                className="cursor-pointer text-lg text-green-700 hover:scale-110 transition-transform"
              >
                <FaEdit />
              </p>
              <p
                onClick={() => {
                  removeProduct(item._id);
                }}
                className="text-right md:text-center cursor-pointer text-lg text-red-800 hover:scale-110 transition-transform"
              >
                <MdDeleteOutline />
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
