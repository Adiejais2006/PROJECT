import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ShopContext = createContext();
const ShopContextProvider = (props) => {
  const currency = "$";
  const deliveryfee = 10;
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    const product = products.find((item) => item._id === itemId);
    let cartData = structuredClone(cartItems);
    let totalQuantity = 0;
    if (cartData[itemId]) {
      for (const selectedSize in cartData[itemId]) {
        totalQuantity += cartData[itemId][selectedSize];
      }
    }
    if (totalQuantity >= product.stock) {
      toast.error(`Only ${product.stock} items available`);
      return;
    }
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    if (token) {
      try {
        const response = await axios.post(
          backendurl + "/api/cart/add",
          {
            itemId,
            size,
          },
          {
            headers: { token },
          },
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  const addToWishlist = async (itemId) => {
    if (!token) {
      toast.error("Login to use wishlist");
      return;
    }
    try {
      const response = await axios.post(
        backendurl + "/api/wishlist/add",
        { itemId },
        {
          headers: { token },
        },
      );
      if (response.data.success) {
        setWishlistItems(response.data.wishlist);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const removeFromWishlist = async (itemId) => {
    if (!token) {
      toast.error("Login to use wishlist");
      return;
    }
    try {
      const response = await axios.post(
        backendurl + "/api/wishlist/remove",
        { itemId },
        {
          headers: { token },
        },
      );
      if (response.data.success) {
        setWishlistItems(response.data.wishlist);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (e) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const product = products.find((item) => item._id === itemId);
    if (!product) return;
    // Calculate total quantity of this product across all sizes
    let otherSizesQuantity = 0;
    if (cartItems[itemId]) {
      for (const selectedSize in cartItems[itemId]) {
        if (selectedSize !== size) {
          otherSizesQuantity += cartItems[itemId][selectedSize];
        }
      }
    }
    const maxAllowed = Math.max(0, product.stock - otherSizesQuantity);
    if (quantity > maxAllowed) {
      toast.error(`Maximum available quantity is ${maxAllowed}`);
      quantity = maxAllowed;
    }
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendurl + "/api/cart/update",
          {
            itemId,
            size,
            quantity,
          },
          {
            headers: { token },
          },
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);

      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (e) {
          console.log(e);
          toast.error(e.message);
        }
      }
    }

    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendurl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendurl + "/api/cart/get",
        {},
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getWishlist = async (token) => {
    try {
      const response = await axios.post(
        backendurl + "/api/wishlist/get",
        {},
        {
          headers: { token },
        },
      );
      if (response.data.success) {
        setWishlistItems(response.data.wishlist);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!token && storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);
      getWishlist(storedToken);
    }
  }, []);

  const value = {
    products,
    currency,
    deliveryfee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendurl,
    token,
    setToken,
    getProductsData,
    wishlistItems,
    setWishlistItems,
    getWishlist,
    addToWishlist,
    removeFromWishlist,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
