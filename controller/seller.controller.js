import { Seller } from "../model/seller.model.js";

import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

export const SingUp = async (request, response, next) => {
    try {
        let saltkey = await bcrypt.genSalt(10);
        let encryptedPassword = await bcrypt.hash(request.body.sellerPassword, saltkey);
        request.body.sellerPassword = encryptedPassword;

        let seller = await Seller.create(request.body)
        return response.status(200).json({ message: "SignUp Successful", seller: seller, status: true });

    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const SignIn = async (request, response, next) => {
    try {
        let responseType = false;
        let seller = await Seller.findOne({ sellerEmail: request.body.sellerEmail });
        console.log(seller);

        responseType = seller ? true : false;

        let status = responseType ? await bcrypt.compare(request.body.sellerPassword, seller.sellerPassword) : false;
        if (status) {
            let payload = { subject: seller.sellerEmail };
            let token = Jwt.sign(payload, "bughgdfhgdhghdghghhg");
            seller = seller?.toObject();
            delete seller?.sellerPassword;
            return status ? response.status(200).json({ message: "SignIn Successful", token: token, status: true }) : response.status(400).json({ error: "Bad request", status: false });
        }
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server error", status: false });
    }
}

