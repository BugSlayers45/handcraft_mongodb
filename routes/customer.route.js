import express from "express";
import { SignIn, SingUp} from "../controller/customer.controller.js";
import { verificationToken } from "../middlewaress/tokenVerification.js";
import { body } from "express-validator";

const router = express.Router();
router.post("/signup",body('customerName').notEmpty(),body('customerEmail').isEmail(), SingUp);
router.post("/signin",verificationToken, SignIn);

export default router;

