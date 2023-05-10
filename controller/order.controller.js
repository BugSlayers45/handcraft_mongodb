import { Customer } from "../model/customer.model.js";
import { Order } from "../model/order.model.js";
import nodemailer from "nodemailer";
import { OrderItems } from "../model/orderItem.model.js";
import { Product } from "../model/product.model.js";
import { Seller } from "../model/seller.model.js";


const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'vikrampratapsingh628@gmail.com',
        pass: 'glqwzpijniaakoum',
    },
    secure: true,
});


export const placeOrder = async (request, response, next) => {
    try {
        const orderIds = Promise.all(
            request.body.orderItems.map(async (orderItem) => {
                let newOrderItems = new OrderItems({
                    quantity: orderItem.quantity,
                    product: orderItem.product
                });
                await newOrderItems.save();
                return newOrderItems._id;
            })
        )
        const orderIdArray = await orderIds;

        const customerinfo = await Customer.findOne(request.body._id)
        console.log(customerinfo.id)
        if (!customerinfo)
            return response.status(401).json({ message: "No user found", status: false })
        else {
            const billAmount = await Promise.all(
                orderIdArray.map(async (id) => {
                    const item = await OrderItems.findById(id).populate("product", "price")
                    return item.product.price * item.quantity;
                })
            )
            const sumPrice = billAmount.reduce((a, b) => { a + b, 0 })
            const order = new Order({
                customerid: customerinfo.id,
                deliveryAddress: request.body.deliveryAddress,
                billAmount: sumPrice,
                contactNumber: request.body.contactNumber,
                contactPerson: request.body.contactPerson,
                orderItem: orderIdArray,
                date: request.body.date,
            })
            await order.save()
            // 
            let _id = customerinfo.id
            let email = await Customer.findOne(_id);
            var mailData = {
                from: 'mukuldixit931@gmail.com',
                to: 'vikrampratapsingh958@gmail.com',
                subject: 'Order Confirmation',
                // text: deliveryAddress+"",
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
    } catch (err) {
        return response.status(500).json({ error: err })
    }
}


export const orderDetailsByCustomerIdorOrderId = async (request, response, next) => {
    try {

        const customer = await Customer.findById({ _id: request.params.id }) || await Order.findById({ _id: request.params.id })
        // console.log(customer)
        if (!customer)
            return response.status(401).json({ message: "invalid user" })
        else {
            const order = await Order.find({ $or: [{ customerid: request.params.id }, { _id: request.params.id }] }).populate({
                path: "orderItem",
                populate: { path: "product" }
            })
            if (order.length == 0)
                return response.status(401).json({ message: "NO order Found" });

            const customer = await Customer.findById({ _id: request.params.id }) || await Order.findById({ _id: request.params.id })
            if (!customer)
                return response.status(401).json({ message: "invalid user" })
            else {
                const order = await Order.find({ $or: [{ customerid: request.params.id }, { _id: request.params.id }] }).populate({
                    path: "orderItem",
                    populate: { path: "product" }
                })
                if (order.length == 0)
                    return response.status(401).json({ message: "NO order Found" });

                return response.status(200).json({ order, status: true })
            }
        }
    }
    catch (err) {
        console.log(err)
        return response.status(500).json({ error: "INTERNAL SERVER ERROR" })
    }
}

export const updateOrder = async (request, response, next) => {
    try {
        let order = await Order.findById(request.params.orderId)
        if (!order)
            return response.status(401).json({ message: "Order ID nor found" })
        if (order.status == "shipped")
            return response.status(200).json({ status: "Order has already shipped" })
        order = await Order.findByIdAndUpdate(
            request.params.orderId,
            {
                status: "shipped"
            }, { new: true }
        )
        return response.status(200).json({ Order: order, status: true })
    }
    catch (err) {
        console.log(err)
        return response.status(500).json({ error: "Internal Server Error" })

    }
}
