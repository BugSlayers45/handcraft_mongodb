import express from "express";
import { Save, addPage, featuresProduct, getProductByCategory, getProductById, productAdd, productListBySellerId, removeProduct, search, updateProduct, updateproducts, viewProduct } from "../controller/product.controller.js";

import verifyTokenForSeller from "../middlewares/tokenVerification.js";
import multer from "multer";



const upload = multer({ dest: "public/Image/" });

const router = express.Router();
router.post("/saveproduct", Save);
router.get("/productlist/:sellerId", productListBySellerId);//sellerId In params
router.post("/update/:_id", updateproducts);
router.post("/delete/:_id", removeProduct);
router.post("/updated/:_id", updateProduct);

// router.get("/save", addPage);
router.get("/viewproduct", viewProduct);
router.get("/featuresproduct", featuresProduct);
router.get("/:id", getProductById);
router.get("/products/:categoryId", getProductByCategory)
router.get("/search/:keyword", search)


router.post("/save", upload.array("image", 3), productAdd);


router.post("/search/:keyword", search)


export default router;