import express from 'express'
import { adminLogin, adminLogout, login, loginWithGoogle, logout, registration } from '../controller/authController.js';
const authRouter = express.Router();

authRouter.post("/registration",registration)
authRouter.post("/login",login)
authRouter.get("/logout",logout)
authRouter.post("/googlelogin",loginWithGoogle)
authRouter.post("/adminlogin",adminLogin)
authRouter.get("/adminlogout",adminLogout)
export default authRouter;
