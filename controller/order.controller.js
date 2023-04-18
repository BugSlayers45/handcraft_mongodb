import express, { request, response } from "express";
import mongoose from "mongoose";
import { Order } from "../model/order.model.js";
import { OrderItems } from "../model/orderItem.model.js";
import { Customer } from "../model/customer.model.js";

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

const customerinfo=await Customer.findOne(request.body._id)
console.log(customerinfo.id)
if(!customerinfo)
    return response.status(401).json({message:"No user found",status:false})
else{
        const billAmount = await Promise.all(
            orderIdArray.map(async (id) => {
                const item = await OrderItems.findById(id).populate("product", "price")
                return item.product.price * item.quantity;
            })
           )
        const sumPrice = billAmount.reduce((a, b) => {a + b, 0})
        const order = new Order({
            customerid: customerinfo.id,
            deliveryAddress: request.body.deliveryAddress,
            billAmount: sumPrice,
            contactNumber: request.body.contactNumber,
            contactPerson: request.body.contactPerson,
            orderItem: orderIdArray,
            date:request.body.date,
        })
        await order.save()
        return response.status(200).json({ orderdetail: order, status: true })
      }
    }catch (err) {
        console.log(err)
        return response.status(500).json({ error: err })
    }
}


export const orderDetailsByCustomerIdorOrderId = async (request, response, next) => {
    try {
        const customer=await Customer.findById({_id:request.body.id})||await Order.findById({_id:request.body.id})
        console.log(customer)
        if(!customer)
        return response.status(401).json({message:"invalid user"})
        else{
        const order = await Order.find({$or:[{ customerid: request.body.id },{_id: request.body.id }]}).populate({
            path: "orderItem",
            populate: { path: "product"}
        })
        if (order.length==0)
            return response.status(401).json({ message: "NO order Found" });
            return response.status(200).json({ order, status: true })
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
                status: request.body.status
            }, { new: true }
        )
        return response.status(200).json({ Order: order })
    }
    catch (err) {
        console.log(err)
        return response.status(500).json({ error: "Internal Server Error" })
    }
}

export const orderDetailsBySeller = async (request, response, next) => {
    try {
       
        const order = await Order.find().populate({
            path: "orderItem",
            populate: { path: "product", match : {"sellerId" : request.body.id}}
        })
       
        if (order.length==0)
            return response.status(401).json({ message: "NO order Found" });
        return response.status(200).json({ order, status: true })
           
          }
   
    catch (err) {
        console.log(err)
        return response.status(500).json({ error: "INTERNAL SERVER ERROR" })
    }


}

export const viewAllOrder = async (request, response, next) => {
    try {
       
        const order = await Order.find().populate({
            path: "orderItem",
            populate: { path: "product"}
        })
        if (order.length==0)
            return response.status(401).json({ message: "NO order Found" });
            return response.status(200).json({ order, status: true })
        
    }

    catch (err) {
        console.log(err)
        return response.status(500).json({ error: "INTERNAL SERVER ERROR" })
    }


}

export const totalOrderItem = async(request, response, next) => {
    try{
    const order = await Order.findById(request.body.id)
    const leng = order.orderItem.length;
    return response.status(200).json({ order, status: true , totalOrder : leng+1})
    }
    catch(err){
        console.log(err);
        return response.status(500).json({ error: "INTERNAL SERVER ERROR" })
    }
 }