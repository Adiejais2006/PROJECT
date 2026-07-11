import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
const Wishlist = () => {
  const { products, wishlistItems } = useContext(ShopContext);
  const wishlistProducts = products.filter((product) =>
    wishlistItems.includes(product._id),
  );

  return (
    <div className="border-t pt-10 px-4 sm:px-8">
      <div className="text-2xl mb-8">
        <Title text1={"MY"} text2={"WISHLIST"} />
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-2xl font-medium mb-2">Your wishlist is empty</p>
          <p className="text-gray-500">
            Save your favourite products and they'll appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {wishlistProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
