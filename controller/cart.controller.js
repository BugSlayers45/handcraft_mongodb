import express, { request, response } from "express";
import mongoose from "mongoose";
import { Cart } from "../model/cart.model.js";
import dbConfig from "../db/dbConfig.js";



export const addToCart = async (request,response,next)=>{
    try{ 
     let cart =  await Cart.findOne({customerId: request.body.customerId});
     if(cart){
        if(cart.cartItems.some((item)=>item.productId == request.body.productId))
          return response.status(200).json({message: "Product already added in cart", status: true});
        cart.cartItems.push({productId: request.body.productId});
        let savedCart = await cart.save();
        return response.status(200).json({message: "Product successfull added in cart", status: true});
     }
     else{
       // Cart not exists
       let savedCart = await Cart.create({
           userId: request.body.userId,
           cartItems:[{productId: request.body.productId}]
       });
       return response.status(200).json({message: "Item added successfully", status: true});
     }
    }
    catch(err){
      console.log(err); 
      return response.status(500).json({error: "Internal Server Error", status: false});
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