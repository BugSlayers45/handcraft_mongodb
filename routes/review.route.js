import express from "express";

import { Reviews, viewReviewByProductId } from "../controller/review.controller.js";
const router = express.Router();

router.post("/save-review", Reviews);
router.get("/viewReview/:id", viewReviewByProductId);



export default router;
