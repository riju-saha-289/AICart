import express from "express";
import { upload } from "../config/multer.js";
import { addProduct, listProducts, removeProduct } from "../controller/productController.js";
import { adminAuthMiddleware } from "../middleware/AdminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/addproduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.get('/list',listProducts);
productRouter.post('/remove/:id',adminAuthMiddleware,removeProduct)

export default productRouter;
