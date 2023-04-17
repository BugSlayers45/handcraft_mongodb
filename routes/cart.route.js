import express from "express";
import { addtocart,removeCart,viewCartItems } from "../controller/cart.controller.js";
import { verificationToken } from "../middlewaress/tokenVerification.js";

const router = express.Router();

router.post("/add-to-cart",verificationToken, addtocart);
router.post("/viewCartItems",verificationToken, viewCartItems);
router.post("/deleteproduct",verificationToken,removeCart)

export default router;