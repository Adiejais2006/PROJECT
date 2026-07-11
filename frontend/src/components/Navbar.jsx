import React from "react";
import { assets } from "../assets/assets.js";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoIosHeartEmpty } from "react-icons/io";
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    showSearch,
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  const [on, setOn] = useState(false);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className={"flex flex-col items-center gap-1"}>
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
        <NavLink
          to="/collections"
          className={"flex flex-col items-center gap-1"}
        >
          <p>COLLECTIONS</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
        <NavLink to="/about" className={"flex flex-col items-center gap-1 "}>
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
        <NavLink to="/contact" className={"flex flex-col items-center gap-1"}>
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <Link to={token ? "/wishlist" : "/login"} className="hidden sm:block">
          <IoIosHeartEmpty className="size-6 cursor-pointer hover:text-red-500 transition-colors" />
        </Link>
        <img
          onClick={() => {
            navigate("/collections");
            setShowSearch(true);
          }}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />
        <div className="group relative">
          <img
            onClick={() => {
              if (!token) navigate("/login");
              else setOn(!on);
            }}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
          />

          <div
            onClick={() => setOn(!on)}
            className={` absolute dropdown-menu right-0 pt-4 ${on ? "block" : "hidden"}`}
          >
            {/* ----------------DROP DOWN MENU --------------- */}
            {token && (
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded ">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p
                  onClick={() => logout()}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer  sm:hidden"
          alt=""
        />
      </div>
      {/* sidebar meny for small screens  */}

      <div
        className={`fixed inset-0 z-50 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink
            className="py-2 pl-6 border border-gray-300 "
            onClick={() => setVisible(false)}
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            className="py-2 pl-6 border border-gray-300 "
            onClick={() => setVisible(false)}
            to="/collections"
          >
            COLLECTIONS
          </NavLink>
          {token && (
            <NavLink
              className="py-2 pl-6 border border-gray-300"
              onClick={() => setVisible(false)}
              to="/wishlist"
            >
              WISHLIST
            </NavLink>
          )}
          <NavLink
            className="py-2 pl-6 border border-gray-300 "
            onClick={() => setVisible(false)}
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            className="py-2 pl-6 border border-gray-300 "
            onClick={() => setVisible(false)}
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
