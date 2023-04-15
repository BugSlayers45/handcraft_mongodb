import { Product } from "../model/product.model.js";
import dbConfig from "../db/dbConfig.js";



export const list = async (request, response, next) => {
    try {
        let product = await Product.find()
        return response.status(200).json({ message: "Product List.....", product: product, status: true });
    } catch (err) {
        return reponse.status(500).json({ error: "Internal Server Error", status: false });
    }
}



