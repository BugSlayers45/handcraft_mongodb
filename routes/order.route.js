import express from "express";
import { orderDetails, placeOrder, updateOrder } from "../controller/order.controller.js";
import { Order } from "../model/order.model.js";


const router=express.Router();
router.post("/orderplacing",placeOrder)
router.get("/orderdetail",orderDetails)
router.get("/updateorderstatus",updateOrder)

export default router