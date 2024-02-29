import express from "express";
import { validation } from "../../middleware/validation.js";

import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { UpdateCouponVal, addCouponVal, paramsIdVal } from "./coupon.validation.js";
import { addCoupon, deleteCoupon, getAllCoupons, getSingleCoupon, updateCoupon } from "./coupon.controller.js";

const couponRouter = express.Router();

couponRouter.use(protectedRoutes,allowedTo("admin"))

couponRouter.route("/")
.post(validation(addCouponVal),addCoupon)
.get(getAllCoupons)
couponRouter.route("/:id")
.get(validation(paramsIdVal),getSingleCoupon)
.put(validation(UpdateCouponVal),updateCoupon)
.delete(validation(paramsIdVal),deleteCoupon)

export default couponRouter;
