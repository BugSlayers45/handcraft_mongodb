import express from "express";
import { orderDetailsByCustomerIdorOrderId, orderDetailsBySeller, placeOrder, updateOrder, viewAllOrder } from "../controller/order.controller.js";
import { verificationToken } from "../middlewaress/tokenVerification.js";
import { verifyToken } from "../middleware/tokenVerification.js";


const router=express.Router();
router.post("/buynow",verificationToken,placeOrder)
router.get("/orderdetail",orderDetailsByCustomerIdorOrderId)
router.get("/view-all-order",viewAllOrder)
router.post("/orderdetailBySeller",orderDetailsBySeller);

router.get("/updateorderstatus/:orderId",updateOrder)

export default router