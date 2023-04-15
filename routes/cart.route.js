import express from "express";
import { addtocart,viewCartItems } from "../controller/cart.controller.js";
import { verificationToken } from "../middlewaress/tokenVerification.js";

const router = express.Router();

router.post("/add-to-cart",verificationToken, addtocart);
router.post("/viewCartItems",verificationToken, viewCartItems);

export default router;