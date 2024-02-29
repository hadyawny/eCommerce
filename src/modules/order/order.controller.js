import { response } from "express";
import { cartModel } from "../../../database/models/cart.model.js";
import { orderModel } from "../../../database/models/order.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import { productModel } from "../../../database/models/product.model.js";

import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51OoqyBAorWl6UChnMPxmyFk9vvULVy0mCCVXsmLMQJ3oaAiJvNyyqUvc7LA0aaCXlFFyd1zxwevr7hYUIxzKbsKe00DAyhxOuB"
);

const createCashOrder = catchError(async (req, res, next) => {
  let cart = await cartModel.findById(req.params.id);
  if (!cart) return next(new AppError("cart not found", 401));
  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  let order = new orderModel({
    user: req.user._id,
    orderItems: cart.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });
  await order.save();

  let options = cart.cartItems.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod.product },
        update: { $inc: { sold: prod.quantity, quantity: -prod.quantity } },
      },
    };
  });

  await productModel.bulkWrite(options);

  await cartModel.findByIdAndDelete(req.params.id);

  res.json({ message: "success", order });
});

const getSpecificOrder = catchError(async (req, res, next) => {
  let order = await orderModel
    .findOne({ user: req.user._id })
    .populate("orderItems.product");
  res.status(200).json({ message: "success", order });
});

const getAllOrders = catchError(async (req, res, next) => {
  let orders = await orderModel.find().populate("orderItems.product");
  res.status(200).json({ message: "success", orders });
});

const createCheckOutSession = catchError(async (req, res, next) => {
  console.log(req.params.id);
  let cart = await cartModel.findById(req.params.id);
  if (!cart) return next(new AppError("cart not found", 401));
  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;


  let session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,

      },
    ],
    mode: "payment",
    success_url:"https://test.com/payment",
    cancel_url:"https://test.com/payment",
    customer_email: req.user.email,
    client_reference_id:  req.params.id , 
    metadata: req.body.shippingAddress
  });
  res.json({message: "success", session})
});

export { createCashOrder, getSpecificOrder, getAllOrders , createCheckOutSession };
