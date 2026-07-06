import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
const Verify = () => {
  const { navigate, token, setCartItems } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const verifyPayment = async () => {
    try {
      if (!token) return null;
      const response = await axios.post(
        backendurl + "/api/order/verifyStripe",
        {
          success,
          orderId,
        },
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div></div>;
};

export default Verify;
