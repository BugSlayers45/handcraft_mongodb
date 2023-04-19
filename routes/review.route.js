import express from "express";

import { reviews, viewReviewByProductId } from "../controller/review.controller.js";
const router = express.Router();

router.post("/save-review", reviews);
router.get("/viewReview/:id", viewReviewByProductId);



export default router;