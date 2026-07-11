import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  addCategory,
  listCategories,
  removeCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();
categoryRouter.post("/add", adminAuth, addCategory);
categoryRouter.get("/list", listCategories);
categoryRouter.post("/remove", adminAuth, removeCategory);
categoryRouter.put("/update/:id", adminAuth, updateCategory);

export default categoryRouter;
