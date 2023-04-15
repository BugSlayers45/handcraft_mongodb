import { Product } from "../model/product.model.js";
import dbConfig from "../db/dbConfig.js";

export const viewProduct = async (request, response, next) => {
    try {
        let product = await Product.find()
        return response.status(200).json({ products: product, status: true });
    } catch (err) {
        return response.status(500).json({ error: "Internal Server", status: false });
    }
}


export const getProductById = (request, response, next) => {
    Product.findById(request.params.id)
        .then(result => {
            return response.status(200).json({ product: result, status: true });
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal Server", status: false });
        })
}


// export const saveallproduct = (request, response, next) => {
//     Product.create(request.body.products)
//         .then(result => {
//             return response.status(200).json({ message: "Product saved...", status: true })
//         })
//         .catch(err => {
//             console.log(err);
//             return response.status(500).json({ error: "Internal server error", status: false });
//         })
// }



export const getProductByCategory = (request, response, next) => {
    Product.find({ categoryId: request.params.categoryId })
        .then(result => {
            return response.status(200).json({products:result,status: true });
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal Server", status: false });
        })
}



