import express from "express";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { createCashOrder, createCheckOutSession, getAllOrders, getSpecificOrder } from "./order.controller.js";
import { createOrderVal } from "./order.validation.js";


const orderRouter = express.Router();

orderRouter
  .route("/")
  .get(protectedRoutes, allowedTo("user"), getSpecificOrder)


orderRouter.get("/all",protectedRoutes, allowedTo("admin"), getAllOrders)
orderRouter.post("/checkout/:id",protectedRoutes, allowedTo("user"), createCheckOutSession)


orderRouter.route("/:id")
  .post(protectedRoutes,allowedTo("user"),validation(createOrderVal),createCashOrder)
  

export default orderRouter;
