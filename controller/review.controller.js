import { Product } from "../model/product.model.js";
import { Review } from "../model/review.model.js";

export const reviews = async(request, response, next) => {
    try {


        const { rating, comment, productId } = request.body;
        console.log(request.body);
        const review = {
            productId: request.body.productId,
            customer: request.body.userId,
            rating: request.body.rating,
            comment: request.body.comment
        }

        const product = await Product.findById(productId);
        if(product){
        const reviews = Review.create(review);
        // Product.ratings = Product.reviews.reduce((acc, item) => item.rating + acc, 0) / Product.reviews.length;
        if(reviews)
        return response.status(200).json({ result:review });
        }
        else{
            return response.status(400).json({ result: "bad request" });
        }

    } catch (err) {
        console.log(err);
    }
}

export const viewReviewByProductId = (request, response, next) => {
    console.log(request.params.id);
    Review.find({ productId:request.params.id })
        .then(result => {
            return response.status(200).json({ reviews: result, status: true });
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal Server", status: false });
        })
}