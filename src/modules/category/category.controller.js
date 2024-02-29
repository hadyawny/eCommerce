import { categoryModel } from "../../../database/models/category.model.js";
import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne, getAllOne, getSingleOne } from "../handler/handlers.js";

const addCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file.filename;
  let category = new categoryModel(req.body);
  await category.save();
  res.json({ message: "success", category });
});

const updateCategory = catchError(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  if (req.file) req.body.image = req.file.filename;
  let category = await categoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  !category && res.status(404).json({ message: "category not found" });
  category && res.json({ message: "success", category });
});

const getAllCategories = getAllOne(categoryModel);

const getSingleCategory = getSingleOne(categoryModel);

const deleteCategory = deleteOne(categoryModel);

export {
  addCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
