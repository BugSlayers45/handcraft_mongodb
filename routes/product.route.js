import express from "express";
import { Save, productListBySellerId, removeProduct, updateproducts } from "../controller/product.controller.js";
import verifyTokenForSeller from "../middlewares/tokenVerification.js";


const router = express.Router();
router.post("/saveproduct", verifyTokenForSeller, Save);
router.get("/productlist/:sellerId", productListBySellerId);//sellerId In params
router.post("/update", verifyTokenForSeller, updateproducts);
router.post("/delete/:sellerId", verifyTokenForSeller, removeProduct);


export default router;