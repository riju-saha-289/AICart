import express from 'express'
import { authMiddleware } from '../middleware/Auth.js';
import { adminAuthMiddleware } from '../middleware/AdminAuth.js';
import {getAdmin, getCurrentUser } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.get("/currentuser",authMiddleware,getCurrentUser)
userRouter.get("/getadmin",adminAuthMiddleware,getAdmin)
export default userRouter;
