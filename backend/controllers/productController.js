import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
// fucntion for add product
import mongoose from "mongoose";
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      stock,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item != undefined,
    );
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
      stock: Number(stock),
    };

    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//list product
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//remove prodduct

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// fucnton for single product info

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// function for update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        success: false,
        message: "Invalid product ID",
      });
    }
    const product = await productModel.findById(id);
    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      stock,
    } = req.body;
    if (Number(price) < 0 || Number(stock) < 0) {
      return res.json({
        success: false,
        message: "Price and stock cannot be negative",
      });
    }
    product.name = name;
    product.description = description;
    product.price = Number(price);
    product.category = category;
    product.subCategory = subCategory;
    product.sizes = JSON.parse(sizes);
    product.bestseller = bestseller === "true";
    product.stock = Number(stock);
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(Boolean);
    if (images.length > 0) {
      const imagesUrl = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        }),
      );
      product.image = imagesUrl;
    }
    await product.save();
    return res.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  updateProduct,
};
