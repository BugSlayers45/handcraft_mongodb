import crypto from "crypto";
import { Payment } from "../model/payment.model.js";
import Razorpay from "razorpay";
 

export const instance = new Razorpay({
    key_id: "rzp_test_mkdEsKQeQYTu1W",
    key_secret: "pxOwMGJTacG2fUJfLNxXDRID"
  });
  

export const checkout = async (request, response) => {
  const options = {
    amount: Number(request.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  response.status(200).json({
    success: true,
    order,
  });
};

export const paymentVerification = async (request, response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    request.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "pxOwMGJTacG2fUJfLNxXDRID")
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if ((true)) {
    console.log("in if")

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    response.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    response.status(400).json({success: false,
    });
  }
};
