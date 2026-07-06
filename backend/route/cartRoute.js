import express from "express";
import authUser from "../middleware/Auth.js";
import {
  getUserCart,
  updateCart,
  addtoCart,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", authUser, addtoCart);
cartRouter.post("/update", authUser, updateCart);
cartRouter.post("/get", authUser, getUserCart);

export default cartRouter;
