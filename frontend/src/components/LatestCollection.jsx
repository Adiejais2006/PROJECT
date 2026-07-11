import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "./../components/ProductItem";
const LatestCollection = () => {
  const [latestproducts, setLatestProducts] = useState([]);
  const { products } = useContext(ShopContext);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10 ">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our latest collection of premium fashion essentials. Browse curated styles designed for comfort, quality, and everyday wear.
        </p>
      </div>
      {/* RENDERING PRODUCTS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestproducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
