import { Seller } from "../model/seller.model.js";


export const countSeller = async (request, response, next) => {
    try {
        let sellers = await Seller.find().count();
        return response.status(200).json({ total_seller: sellers, status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error", status: false });
    }

}