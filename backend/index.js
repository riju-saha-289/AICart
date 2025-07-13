import express from "express";
const app = express();

import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter.js";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js";
dotenv.config();

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(cookieParser());

// cors
app.use(
  cors({
    origin: ["https://aicart-frontend.onrender.com", "https://aicart-admin.onrender.com"],
    credentials: true,
  })
);
app.use("/api/Auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.listen(port, () => {
  connectDB();
  console.log(`Server running at http://localhost:${port}/`);
});
