import express from "express";
import { orderDetailsByCustomerIdorOrderId, placeOrder, updateOrder,order, viewAllOrder} from "../controller/order.controller.js";
import { verificationToken } from "../middlewaress/tokenVerification.js";



const router = express.Router();

router.post("/orderdetail",verificationToken ,order);
router.post("/buynow",placeOrder)
router.post("/orderdetails",orderDetailsByCustomerIdorOrderId)
router.get("/viewOrder",viewAllOrder)
router.get("/updateorderstatus/:orderId",verificationToken,updateOrder)



export default router

