import express from "express";
import { getOrderDetails, placeOrder, updateOrder,order} from "../controller/order.controller.js";
import { verificationToken } from "../middlewaress/tokenVerification.js";



const router = express.Router();

// router.post("/orderdetail",order);
router.post("/buynow",placeOrder)
router.get("/orderdetail",getOrderDetails)
router.get("/updateorderstatus/:orderId",verificationToken,updateOrder)



export default router

