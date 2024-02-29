import express from "express";
import { validation } from "../../middleware/validation.js";
import { addUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "./user.controller.js";
import { addUserVal, paramsIdVal, updateUserVal } from "./user.validation.js";
import { checkEmail } from "../../middleware/emailExist.js";

const userRouter = express.Router();

userRouter.route("/")
.post(validation(addUserVal),checkEmail,addUser)
.get(getAllUsers)
userRouter.route("/:id")
.get(validation(paramsIdVal),getSingleUser)
.put(validation(updateUserVal),updateUser)
.delete(deleteUser)

export default userRouter;
