import express from "express";
import {customerCount, ordercount, sellerAproval, sellerDeactive, sellercount, signIn, signUp } from "../controller/admin.controlller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/signup",body("name").notEmpty(),
body("email").isEmail(),
body("password").notEmpty(),signUp);
router.post("/signin",signIn);

router.put('/:id',sellerAproval);
router.get('/customer/count',customerCount);
router.get('/seller/count',sellercount);
router.get("/order/count",ordercount);
router.get("/seller/deactive",sellerDeactive);


export default router;