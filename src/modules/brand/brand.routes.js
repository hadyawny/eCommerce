import express from "express";
import { validation } from "../../middleware/validation.js";
import { uploadSingleFile } from "../../services/fileUploads/fileUploads.js";
import { UpdateBrandVal, addBrandVal, paramsIdVal } from "./brand.validation.js";
import { addBrand, deleteBrand, getAllBrands, getSingleBrand, updateBrand } from "./brand.controller.js";


const brandRouter = express.Router();

brandRouter.route("/")
.post(uploadSingleFile('logo'),validation(addBrandVal),addBrand)
.get(getAllBrands)
brandRouter.route("/:id")
.get(validation(paramsIdVal),getSingleBrand)
.put(uploadSingleFile('logo'),validation(UpdateBrandVal),updateBrand)
.delete(validation(paramsIdVal),deleteBrand)

export default brandRouter;
