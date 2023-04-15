import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    discountPercentage: {
        type: Number
    },
    rating: {
        type: Number
    },
    stock: {
        type: Number
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    thumbnail: {
        type: String
    },
    images: {
        type: []
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "seller",
        required: true
    },
    keyword: {
        type: String
    }
})

export const Product = mongoose.model("product", productSchema);

