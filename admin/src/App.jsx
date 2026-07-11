import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
export const backendurl = import.meta.env.VITE_BACKEND_URL;
import { ToastContainer } from "react-toastify";
import CategoryList from "./pages/CategoryList";
import CategoryAdd from "./pages/CategoryAdd ";
export const currency = "$";
const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : "",
  );
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <div className="bg-gray-50 min-h-screen ">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr className="border-gray-200" />
          <div className=" w-full flex">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/edit/:id" element={<Add token={token} />} />
                <Route
                  path="/categories"
                  element={<CategoryAdd token={token} />}
                />
                <Route
                  path="/list-category"
                  element={<CategoryList token={token} />}
                />
                <Route
                  path="/edit-category/:id"
                  element={<CategoryAdd token={token} />}
                />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
