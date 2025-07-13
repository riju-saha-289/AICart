import express from "express";
const orderRouter = express.Router();
import { authMiddleware } from '../middleware/Auth.js';
import { createRazorpayOrder, getAllOrders, getMyOrders, placeOrder, updateOrderStatus } from "../controller/orderController.js";
import { adminAuthMiddleware } from "../middleware/AdminAuth.js";
orderRouter.post('/place',authMiddleware,placeOrder)
orderRouter.get('/myorder',authMiddleware,getMyOrders)
orderRouter.post('/razorpay', authMiddleware, createRazorpayOrder);

// Admin routes protected by adminAuthMiddleware
orderRouter.get("/admin-orders", adminAuthMiddleware, getAllOrders);
orderRouter.put("/admin-orders/:id/status", adminAuthMiddleware, updateOrderStatus);

export default orderRouter