import express from "express";
import { validation } from "../../middleware/validation.js";
import { checkEmail } from "../../middleware/emailExist.js";
import { changePassword, protectedRoutes, signin, signup } from "./auth.controller.js";
import { changePasswordVal, signinSchemaVal, signupSchemaVal } from "./auth.validation.js";



const authRouter = express.Router();

authRouter.post("/signup",validation(signupSchemaVal), checkEmail, signup);
authRouter.post("/signin",validation(signinSchemaVal), signin);
authRouter.patch("/changepassword/",protectedRoutes,validation(changePasswordVal), changePassword);

export default authRouter;
