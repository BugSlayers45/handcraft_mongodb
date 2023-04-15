import express from "express";
import {  list } from "../controller/product.controller.js";

const router = express.Router();

router.get("/list", list);





export default router;