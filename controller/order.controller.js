import { Customer } from "../model/customer.model.js";
import { Order } from "../model/order.model.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'vikrampratapsingh628@gmail.com',
        pass: 'glqwzpijniaakoum',
    },
    secure: true,
});

export const order = async (request, response, next) => {
    try {
        let order = await Order.create({
            customerId: request.body.customerId,
            deliveryAddress: request.body.deliveryAddress,
            contactNumber: request.body.contactNumber,
            contactPerson: request.body.contactPerson,
            billAmount: request.body.billAmount,
            orderItmes: [{ productId: request.body.productId,qty: request.body.qty }, {productId: request.body.productId2,qty: request.body.qty2  }]
       
        })
        // console.log(order)
        let _id = order.customerId
        let email = await Customer.findOne(_id);
        const { deliveryAddress, contactNumber, contactPerson, billAmount } = request.body
        var mailData = {
            from: 'vikrampratapsingh628@gmail.com',
            to: email.customerEmail,
            subject: 'Order Confirmation',
            // text: deliveryAddress+"",
            // text: text pr hi likhna padega
            html: '<b>Hey Dear! </b><br> Your order confirm and ready to deliverd<br/><br/>' + contactPerson + "<br/>" + deliveryAddress + "<br/>" + contactNumber + "<br/>" + billAmount,
        };
        transporter.sendMail(mailData, (error, info) => {
            if (error) {
                return console.log(error);
            }
            return response.status(200).send({ message: "Mail send", message_id: info.messageId });
        });
        return response.status(200).json({ message: "Order successfull placed..", status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ errro: "Internal server error", status: false });
    }
}