import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./route/userRouter.js";
import productRoute from "./route/productRoute.js";
import cartRouter from "./route/cartRoute.js";
import orderRouter from "./route/orderRoute.js";
import categoryRouter from "./route/categoryRoute.js";
// APP config
const app = express();
const port = process.env.PORT || 4000;
connectDb();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

//api end points
app.use("/api/user", userRouter);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/category", categoryRouter);
app.get("/", (req, res) => {
  res.send("hello backend");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
