import express from "express";
import authUser from "../middleware/Auth.js";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/add", authUser, addToWishlist);
router.post("/remove", authUser, removeFromWishlist);
router.post("/get", authUser, getWishlist);

export default router;
