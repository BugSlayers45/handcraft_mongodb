import express from "express";
import { SignIn, SingUp } from "../controller/customer.controller.js";
import { body } from "express-validator";

const router = express.Router();
router.post("/signup", body('customerName').notEmpty(), body('customerEmail').isEmail(), SingUp);
router.post("/signin", SignIn);

export default router;

