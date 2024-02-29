import express from "express";
import { validation } from "../../middleware/validation.js";
import { UpdateSubCategoryVal, addSubCategoryVal, paramsIdVal } from "./subcategory.validation.js";
import { addSubCategory, deleteSubCategory, getAllSubCategories, getSingleSubCategory, updateSubCategory } from "./subcategory.controller.js";

const subcategoryRouter = express.Router({mergeParams: true});

subcategoryRouter.route("/")
.post(validation(addSubCategoryVal),addSubCategory)
.get(getAllSubCategories)
subcategoryRouter.route("/:id")
.get(validation(paramsIdVal),getSingleSubCategory)
.put(validation(UpdateSubCategoryVal),updateSubCategory)
.delete(validation(paramsIdVal),deleteSubCategory)

export default subcategoryRouter;
