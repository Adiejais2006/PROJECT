import React from "react";
import { NavLink } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { assets } from "../assets/assets";
export const Sidebar = () => {
  return (
    <div className="w-[18%]  min-h-screen border-r-2 border-gray-200 ">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/add"
        >
          <img src={assets.add_icon} alt="Add" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/list"
        >
          <img src={assets.order_icon} alt="Add" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/orders"
        >
          <img src={assets.order_icon} alt="Add" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/categories"
        >
          <BiCategory className="size-7  " />
          <p className="hidden md:block">Add Categories</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/list-category"
        >
          <BiCategory className="size-7  " />
          <p className="hidden md:block">List Categories</p>
        </NavLink>
      </div>
    </div>
  );
};
