import express, { request, response } from "express";
import mongoose from "mongoose";
import { Cart } from "../model/cart.model.js";
import dbConfig from "../db/dbConfig.js";



export const addtocart = async (request, response, next) => {
  try {
    let cart = await Cart.findOne({ customerId: request.body.customerId });
    if (cart) {
      let cartItemsList = cart.cartItem;
      let index = cartItemsList.findIndex((item) => item.productId == request.body.productId)
      if (index != -1)
        return response.status(200).json({ message: "Product already added in cart", status: true })
      else {
        cart.cartItem.push({ productId: request.body.productId });
        let savedCart = await cart.save({});
        return response.status(200).json({ message: "Product successfull added", status: true });
      }
    }
    else {
      let saveCart = await Cart.create({
        customerId: request.body.customerId,
        cartItem: [{ productId: request.body.productId }]
      });
      return response.status(200).json({ message: "Item added successfull", status: true })
    }
  }
  catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal Server Error", status: false });
  }
}


export const viewCartItems = async (request, response, next) => {
  try {
    let cartItems = await Cart.findOne({ customerId: request.body.customerId }).populate("cartItem.productId")

    return response.status(200).json({ cart: cartItems, status: true })

  }
  catch (err) {
    console.log(err)
    return response.status(500).json({ error: "INTERNAL SERVER ERROR", status: false })
  }
}
