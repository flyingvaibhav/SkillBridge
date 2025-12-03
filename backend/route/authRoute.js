import express from "express"
import { login, logout, signUp , sendOTP, verifyOTP, resetPassword, googleAuth, } from "../controller/authController.js";


const  authRouter = express.Router();

 authRouter.post('/signup', signUp)
 authRouter.post('/login', login)
 authRouter.get('/logout', logout)

   authRouter.post('/send-otp', sendOTP);
   authRouter.post('/verify-otp', verifyOTP);
   authRouter.post('/reset-password', resetPassword);
   authRouter.post('/googleauth', googleAuth);
   

export default authRouter;