import { Product } from "../model/product.model.js";
import { Review } from "../model/review.model.js";

export const Reviews = async(request, response, next) => {
    try {
        console.log(request.body);
        const review = {
            productId: request.body.productId,
            customer: request.body.userId,
            rating: request.body.rating,
            comment: request.body.comment
        }

        const product = await Product.findById(productId);
        if(product){
        const reviews = await Review.create(review)
        if(reviews)
        return response.status(200).json({ result:review, status : true});
        }
        else{
            return response.status(400).json({ result: "bad request", status : false});
        }

    } catch (err) {
        console.log(err);
        return response.status(500).json({ result: "Server error", status : false});
    }
}

export const viewReviewByProductId = (request, response, next) => {
    Review.find({ productId:request.params.id }).populate({path :"customer"}).populate({path : "productId"}) 
    .then(result => {
            return response.status(200).json({ reviews: result, status: true });
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal Server", status: false });
        })
}
