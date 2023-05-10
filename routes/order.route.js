import express from "express";

import { orderDetailsByCustomerIdorOrderId, placeOrder, updateOrder, order, allOrder, orderDetailsBySeller } from "../controller/order.controller.js";
import { verificationToken } from "../middlewaress/tokenVerification.js";



const router = express.Router();


router.post("/orderdetail", order);
router.post("/buynow", placeOrder)
router.get("/orderdetail", orderDetailsByCustomerIdorOrderId)
router.get("/updateorderstatus/:orderId", verificationToken, updateOrder)
router.get("/allorders", allOrder)
router.get("/getorderbyseller/:id", orderDetailsBySeller);


router.post("/buynow", placeOrder)
// router.get("/orderdetail",getOrderDetails)
router.get("/updateorderstatus/:orderId", updateOrder)




export default router

