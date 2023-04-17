import express, { Router } from "express"
import { order } from "../controller/order.controller.js";

const router = express.Router();

router.post("/orderdetail",order);

export default router;