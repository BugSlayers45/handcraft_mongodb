import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { Admin } from "../model/admin.model.js";
import Jwt from "jsonwebtoken";
import { Seller } from "../model/seller.model.js";
import { Customer } from "../model/customer.model.js";
import { Order } from "../model/order.model.js";

export const signUp = async (request, response, next) => {
    const errors = await validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ error: "Bad request", message: errors.array() })
    let saltkey = await bcrypt.genSalt(10);
    request.body.password = await bcrypt.hash(request.body.password, saltkey);

    let admin = Admin.create(request.body)
        .then(result => {
            return response.status(200).json({ Admin: result, status: true })
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error", status: false });
        })
}

export const signIn = async (request, response, next) => {
    try {
        let admin = await Admin.findOne({ email: request.body.email });
        if (admin) {
            let status = await bcrypt.compare(request.body.password, admin.password);
            if (status) {
                let payload = { subject: Admin.email };
                let token = Jwt.sign(payload, 'fkjdfhfflfglkfaslfgdlf')
                admin = admin.toObject();
                delete admin.password;
                console.log(admin);
                return response.status(200).json({ message: "signin seccess", token: token, status: true });
            }
            else
                return response.status(401).json({ error: "Unauthorized user", status: false });
        }
        else
            return response.status(401).json({ error: "Unauthorized user", status: false });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const sellerAproval = async (request, response, next) => {
    const seller = await Seller.findByIdAndUpdate(request.params.id, {
        status: "Active"
    }
    )
    if (!seller)
        return response.status(400).send('this seller cannot fount...')
    return response.status(200).json({ message: "successfull aprovel... ", status: true });
}

export const customerCount = (request, response, next) => {
    const count = Customer.find()
        .then(function (models) {
            return response.status(200).json({ customer: models.length, status: true });
        })
        .catch(function (err) {
            console.log(err);
            return response.status(500).json({ error: "Internal server error", status: false });
        });
}

export const sellercount = (request, response, next) => {
    const count = Seller.find()
        .then(function (models) {
            return response.status(200).json({seller: models.length, status: true });
        })
        .catch(function (err) {
            console.log(err);
            return response.status(500).json({ error: "Internal server error", status: false });
        });
}

export const ordercount = (request, response, next) => {
    const count = Order.find()
        .then(function (models) {
            return response.status(200).json({orders: models.length, status: true });
        })
        .catch(function (err) {
            console.log(err);
            return response.status(500).json({ error: "Internal server error", status: false });
        });
}