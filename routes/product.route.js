import express from "express";

import { Save, getProductByCategory, getProductById, productListBySellerId, removeProduct, search, updateproducts, viewProduct } from "../controller/product.controller.js";
import verifyTokenForSeller from "../middlewares/tokenVerification.js";


const router = express.Router();
router.post("/saveproduct", verifyTokenForSeller, Save);
router.get("/productlist/:sellerId", productListBySellerId);//sellerId In params
router.post("/update", verifyTokenForSeller, updateproducts);
router.post("/delete/:sellerId", verifyTokenForSeller, removeProduct);

// router.post("/saveproduct",saveallproduct);
router.get("/viewproduct",viewProduct);
router.get("/:id", getProductById);
router.get("/products/:categoryId",getProductByCategory)
router.post("/search/:keyword",search)

export default router;