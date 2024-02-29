import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { subcategoryModel } from "../../../database/models/subcategory.model.js";
import { deleteOne, getAllOne, getSingleOne } from "../handler/handlers.js";

const addSubCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  let subcategory = new subcategoryModel(req.body);
  await subcategory.save();
  res.json({ message: "success", subcategory });
});

const updateSubCategory = catchError(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  let subcategory = await subcategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
    );
    !subcategory && res.status(404).json({ message: "subcategory not found" });
    subcategory && res.json({ message: "subcategory", subcategory });
  });

const getAllSubCategories = getAllOne(subcategoryModel);

const getSingleSubCategory = getSingleOne(subcategoryModel);

const deleteSubCategory = deleteOne(subcategoryModel);

export {
  addSubCategory,
  getAllSubCategories,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
