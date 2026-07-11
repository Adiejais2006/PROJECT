import React from "react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
const ProductItem = ({ id, image, name, price }) => {
  const { currency, wishlistItems, addToWishlist, removeFromWishlist } =
    useContext(ShopContext);
  const isWishlisted = wishlistItems.includes(id);
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  return (
    <Link
      className="relative block text-gray cursor-pointer"
      to={`/product/${id}`}
    >
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 z-10 bg-white/90 rounded-full p-1.5 shadow-md hover:scale-110 transition-all"
      >
        {isWishlisted ? (
          <IoIosHeart className="text-red-500 text-2xl" />
        ) : (
          <IoIosHeartEmpty className="text-2xl text-gray-600" />
        )}
      </button>
      <div className="overflow-hidden">
        <img
          loading="lazy"
          className="hover:scale-110 transition ease-in-out"
          src={image[0]}
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
