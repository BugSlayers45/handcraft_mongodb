import express from "express";
import { orderDetailsByCustomerIdorOrderId, placeOrder, updateOrder} from "../controller/order.controller.js";
import { verificationToken } from "../middlewaress/tokenVerification.js";



const router = express.Router();

router.post("/buynow",placeOrder)
router.get("/orderdetailbycustomer/:id", orderDetailsByCustomerIdorOrderId)
router.put("/updateorderstatus/:orderId",updateOrder)



export default router

