import React from "react";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { Link } from "react-router-dom";
const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 border-gray-200 pt-10 transition-opacity ease-in duration-500 opacity-100 ">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* PRODUCT IMAHGES  */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                src={item}
                onClick={() => setImage(item)}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto " />
          </div>
        </div>
        {/* ------------------PRODUCT INFO -----------*/}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <div className="mt-3">
            {productData.stock > 5 ? (
              <p className="text-green-600 font-medium">
                In Stock ({productData.stock} available)
              </p>
            ) : productData.stock > 0 ? (
              <p className="text-yellow-600 font-medium">
                Only {productData.stock} left!
              </p>
            ) : (
              <p className="text-red-600 font-medium">Out of Stock</p>
            )}
          </div>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border border-gray-200 py-2  px-4 bg-gray-100 ${item === size ? "border-orange-500" : ""} ease-in-out duration-200 `}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            disabled={productData.stock === 0}
            onClick={() => addToCart(productData._id, size)}
            className={`bg-black text-white px-8 py-3  text-sm active:bg-gray-700 ${productData.stock === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {productData.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}
          </button>
          <hr className="mt-8 sm:w-4/5 border-gray-200" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash On Delivery Available</p>
            <p>Easy 30 Days Returns and Exchanges</p>
          </div>
        </div>
      </div>
      {/* ---------Decription & Review Section-------------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border border-gray-200 px-5 py-3 text-sm">
            Description
          </b>
          <p className="border border-gray-200 px-5 py-3 text-sm">
            Reviews(122)
          </p>
        </div>

        <div className="flex flex-col gap-4 border border-gray-200 px-6 py-6 text-sm text-gray-500">
          <p>
            lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quod. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam, quod. Quisquam, quod. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quod.
          </p>
          <p>
            lroem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quod. lroem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, quod.
          </p>
        </div>
      </div>
      {/* ----------display  related products-------------- */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="border-t-2 border-gray-200 pt-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-semibold">Product Not Found</h1>
      <p className="text-gray-500 mt-3">
        The product you're looking for doesn't exist or may have been removed.
      </p>

      <Link
        to="/collections"
        className="mt-6 bg-black text-white px-6 py-3 inline-block"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default Product;
