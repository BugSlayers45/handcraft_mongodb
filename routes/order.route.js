import express from "express";
import { orderDetailsByCustomerIdorOrderId, placeOrder, updateOrder,order} from "../controller/order.controller.js";
import { verificationToken } from "../middlewaress/tokenVerification.js";



const router = express.Router();

router.post("/orderdetail",order);
router.post("/buynow",verificationToken,placeOrder)
router.get("/orderdetail",verificationToken,orderDetailsByCustomerIdorOrderId)
router.get("/updateorderstatus/:orderId",verificationToken,updateOrder)



export default router

