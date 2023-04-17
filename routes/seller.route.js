import express from "express";
//import { addCategory, categoryList, remove, saveAllCategory, update } from "../controller/category.controller.js";
import {countSeller} from "../controller/seller.controller.js";
const router = express.Router();
router.get("/count",countSeller);
export default router;
