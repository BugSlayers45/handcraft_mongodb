import express from "express";
import { getOrderDetails, placeOrder, updateOrder} from "../controller/order.controller.js";
import { verificationToken } from "../middlewaress/tokenVerification.js";



const router = express.Router();

router.post("/buynow",placeOrder)
router.get("/orderdetail",getOrderDetails)
router.post("/buynow",verificationToken,placeOrder)
router.get("/updateorderstatus/:orderId",verificationToken,updateOrder)



export default router

