import express from "express";
import { validation } from "../../middleware/validation.js";
import { addToWishlistVal, paramsIdVal } from "./wishlist.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addToWishlist, getLoggedUserWishlist, removeFromWishlist } from "./wishlist.controller.js";


const wishlistRouter = express.Router();

wishlistRouter.route("/")
.patch(protectedRoutes,allowedTo("user"),validation(addToWishlistVal),addToWishlist)
.get(protectedRoutes,allowedTo("user"),getLoggedUserWishlist)

wishlistRouter.route("/:id")
.delete(protectedRoutes,allowedTo("user","admin"),validation(paramsIdVal),removeFromWishlist)

export default wishlistRouter;
