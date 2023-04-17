import express from "express";
import { fetchWishlist, removeWishlist, wishlist } from "../controller/wishlist.controller.js";
import { verificationToken } from "../middlewaress/tokenVerification.js";

const router = express.Router();

router.post('/addtowishlist',verificationToken,wishlist);
router.post('/viewwishlist',verificationToken,fetchWishlist);
router.post('/delete',verificationToken,removeWishlist);

export default router;