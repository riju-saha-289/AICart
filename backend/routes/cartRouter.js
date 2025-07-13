import express from "express";
const cartRouter = express.Router();
import { authMiddleware } from '../middleware/Auth.js';
import { addToCart, getUserCart, removeFromCart, updateCart } from "../controller/cartController.js";
cartRouter.get('/get',authMiddleware,getUserCart)
cartRouter.post('/add',authMiddleware,addToCart)
cartRouter.post('/update',authMiddleware,updateCart)
cartRouter.post('/remove',authMiddleware,removeFromCart)




export default cartRouter