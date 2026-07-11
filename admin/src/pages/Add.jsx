import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { backendurl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
const Add = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSize] = useState([]);
  const [stock, setStock] = useState(0);
  const [existingImages, setExistingImages] = useState([]);
  const fetchProduct = async () => {
    try {
      const response = await axios.post(backendurl + "/api/product/single", {
        productId: id,
      });
      if (response.data.success) {
        const product = response.data.product;
        setExistingImages(product.image);
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setSubCategory(product.subCategory);
        setBestSeller(product.bestseller);
        setSize(product.sizes);
        setStock(product.stock);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("stock", stock);
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      let response;
      if (isEditMode) {
        response = await axios.put(
          backendurl + `/api/product/update/${id}`,
          formData,
          {
            headers: { token },
          },
        );
      } else {
        response = await axios.post(backendurl + "/api/product/add", formData, {
          headers: { token },
        });
      }
      if (response.data.success) {
        toast.success(response.data.message);
        if (isEditMode) {
          navigate("/list");
          return;
        }
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestSeller(false);
        setSize([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setStock(0);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex  flex-col w-full gap-3 items-start"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={
                image1
                  ? URL.createObjectURL(image1)
                  : existingImages[0] || assets.upload_area
              }
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={
                image2
                  ? URL.createObjectURL(image2)
                  : existingImages[1] || assets.upload_area
              }
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={
                image3
                  ? URL.createObjectURL(image3)
                  : existingImages[2] || assets.upload_area
              }
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={
                image4
                  ? URL.createObjectURL(image4)
                  : existingImages[3] || assets.upload_area
              }
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          value={name}
          placeholder="Type here"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          value={description}
          placeholder="Write content here"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Stock</p>
        <input
          onChange={(e) => setStock(Number(e.target.value))}
          className="w-full max-w-[500px] px-3 py-2"
          type="number"
          value={stock}
          min="0"
          placeholder="Enter Stock"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Subcategory</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
            value={subCategory}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            className="w-full sm:w-[120px] px-3 py-2"
            type="number"
            value={price}
            placeholder="Enter price"
            required
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSize(
                sizes.includes("S")
                  ? sizes.filter((item) => item !== "S")
                  : [...sizes, "S"],
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer mb-2 ${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200 "}`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSize(
                sizes.includes("M")
                  ? sizes.filter((item) => item !== "M")
                  : [...sizes, "M"],
              )
            }
          >
            <p
              className={` px-3 py-1 cursor-pointer mb-2 ${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"}`}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSize(
                sizes.includes("L")
                  ? sizes.filter((item) => item !== "L")
                  : [...sizes, "L"],
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer mb-2 ${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200 "}`}
            >
              L
            </p>
          </div>
          <div
            onClick={() =>
              setSize(
                sizes.includes("XL")
                  ? sizes.filter((item) => item !== "XL")
                  : [...sizes, "XL"],
              )
            }
          >
            <p
              className={` px-3 py-1 cursor-pointer mb-2 ${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"}`}
            >
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setSize(
                sizes.includes("XXL")
                  ? sizes.filter((item) => item !== "XXL")
                  : [...sizes, "XXL"],
              )
            }
          >
            <p
              className={` px-3 py-1 cursor-pointer mb-2 ${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"}`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          onChange={(e) => setBestSeller((prev) => !prev)}
          className="cursor-pointer"
          type="checkbox"
          id="bestseller"
          checked={bestseller}
        />
        <label htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button type="submit" className="w-28  py-3 mt-4 bg-black text-white">
        {isEditMode ? "UPDATE" : "ADD"}
      </button>
    </form>
  );
};

export default Add;
