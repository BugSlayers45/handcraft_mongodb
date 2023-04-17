import express from "express";
// <<<<<<< HEAD
// //import { addCategory, categoryList, remove, saveAllCategory, update } from "../controller/category.controller.js";
// // import {countSeller} from "../controller/seller.controller.js";
// // const router = express.Router();
// // router.get("/count",countSeller);
// // export default router;
// // =======
import { SignIn, SingUp } from "../controller/seller.controller.js";
import { body } from "express-validator";
import { verifyTokenForSeller } from "../middlewares/tokenVerification.js";

const router = express.Router();

router.post("/signin", verifyTokenForSeller, SignIn);//In body:sellerEmail,sellerPassword
router.post("/signup",
    body("sellerName", "Enter name").notEmpty(),
    body("sellerEmail", "Invalid Email").isEmail(),
    body("sellerContact").isNumeric(),
    body("sellerPassword", "enter password").notEmpty(), SingUp);

export default router;

// >>>>>>> 5cf3c5ec1183459a1fcef8cb6d91abf26038717a
