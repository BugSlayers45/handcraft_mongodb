import express from "express";
import { getOrderDetails, placeOrder, updateOrder} from "../controller/order.controller.js";
import { verificationToken } from "../middlewaress/tokenVerification.js";



const router = express.Router();

router.post("/buynow",placeOrder)
router.post("/orderdetail",getOrderDetails)
router.get("/updateorderstatus/:orderId",updateOrder)



export default router

