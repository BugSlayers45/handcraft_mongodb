import express from "express";
import { getProductById, viewProduct } from "../controller/product.controller.js";

const router = express.Router();

router.get("/viewproduct",viewProduct);
router.get("/:id", getProductById);

export default router;