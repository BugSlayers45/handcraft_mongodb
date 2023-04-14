import express from "express";
import { signIn, signUp } from "../controller/admin.controlller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/signup",body("name").notEmpty(),
body("email").isEmail(),
body("password").notEmpty(),signUp);
router.post("/signin",signIn);


export default router;