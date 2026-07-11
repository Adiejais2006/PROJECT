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
    <div className="border-t pt-10">
      <div className="text-2xl mb-8">
        <Title text1={"MY"} text2={"WISHLIST"} />
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
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
