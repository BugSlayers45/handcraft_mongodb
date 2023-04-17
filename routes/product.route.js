import express from "express";

import { Save, addPage, getProductByCategory, getProductById, productAdd, productListBySellerId, removeProduct, updateproducts, viewProduct } from "../controller/product.controller.js";
import verifyTokenForSeller from "../middlewares/tokenVerification.js";

import multer from "multer";
const upload = multer({dest:"public/Image/"});

const router = express.Router();
router.post("/saveproduct", verifyTokenForSeller, Save);
router.get("/productlist/:sellerId", productListBySellerId);//sellerId In params
router.post("/update", verifyTokenForSeller, updateproducts);
router.post("/delete/:sellerId", verifyTokenForSeller, removeProduct);

router.get("/save",addPage);
router.get("/viewproduct",viewProduct);
router.get("/:id", getProductById);
router.get("/products/:categoryId",getProductByCategory)

router.post("/save", upload.array("image",3) ,productAdd);


export default router;