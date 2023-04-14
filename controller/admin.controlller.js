import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { Admin } from "../model/admin.model.js";

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