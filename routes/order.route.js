import express from "express";
import { orderDetailsByCustomerIdorOrderId, placeOrder, updateOrder } from "../controller/order.controller.js";
import { verificationToken } from "../middlewaress/tokenVerification.js";
import { verifyToken } from "../middleware/tokenVerification.js";


const router=express.Router();
router.post("/buynow",verificationToken,placeOrder)
router.get("/orderdetail",orderDetailsByCustomerIdorOrderId)
router.get("/updateorderstatus/:orderId",updateOrder)

export default router