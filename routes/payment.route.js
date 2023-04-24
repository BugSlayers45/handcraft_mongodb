import express from "express";
import {checkout,paymentVerification} from "../controller/payment.controller.js";


// import { verificationToken } from "../middlewaress/tokenVerification.js";



const router = express.Router();




router.post("/checkout" ,checkout);
router.post("/paymentverification",paymentVerification);




export default router