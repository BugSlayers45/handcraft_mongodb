import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
        required: true
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    comment: {
        type: String,
        required: true
    }

});

export const Review = mongoose.model("review", reviewSchema);