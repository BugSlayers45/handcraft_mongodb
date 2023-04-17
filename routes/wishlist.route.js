import express from "express";
import { fetchWishlist, removeWishlist, wishlist } from "../controller/wishlist.controller.js";

const router = express.Router();

router.post('/addtowishlist',wishlist);
router.post('/viewwishlist',fetchWishlist);
router.post('/delete/:id',removeWishlist);

export default router;