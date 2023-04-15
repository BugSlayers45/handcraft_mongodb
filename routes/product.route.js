import express from "express";
import { getProductByCategory, getProductById, viewProduct } from "../controller/product.controller.js";

const router = express.Router();

// router.post("/saveproduct",saveallproduct);
router.get("/viewproduct",viewProduct);
router.get("/:id", getProductById);
router.get("/products/:categoryId",getProductByCategory)

export default router;