import express from "express";
import { validation } from "../../middleware/validation.js";
import { addReview, deleteReview, getAllReviews, getSingleReview, updateReview } from "./review.controller.js";
import { UpdateReviewVal, addReviewVal, paramsIdVal } from "./review.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const reviewRouter = express.Router();

reviewRouter.route("/")
.post(protectedRoutes,allowedTo("user"),validation(addReviewVal),addReview)
.get(getAllReviews)
reviewRouter.route("/:id")
.get(validation(paramsIdVal),getSingleReview)
.put(protectedRoutes,allowedTo("user"),validation(UpdateReviewVal),updateReview)
.delete(protectedRoutes,allowedTo("user","admin"),validation(paramsIdVal),deleteReview)

export default reviewRouter;
