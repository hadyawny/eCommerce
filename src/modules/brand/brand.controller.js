import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { brandModel } from "../../../database/models/brand.model.js";
import { deleteOne, getAllOne, getSingleOne } from "../handler/handlers.js";

const addBrand = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.logo = req.file.filename;
  let brand = new brandModel(req.body);
  await brand.save();
  res.json({ message: "success", brand });
});

const updateBrand = catchError(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  if (req.file) req.body.logo = req.file.filename;
  let brand = await brandModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  !brand && res.status(404).json({ message: "brand not found" });
  brand && res.json({ message: "success", brand });
});

const getAllBrands = getAllOne(brandModel);

const getSingleBrand = getSingleOne(brandModel);

const deleteBrand = deleteOne(brandModel);

export { addBrand, getAllBrands, getSingleBrand, updateBrand, deleteBrand };
