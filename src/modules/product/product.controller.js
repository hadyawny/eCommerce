import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { productModel } from "../../../database/models/product.model.js";
import { deleteOne, getAllOne, getSingleOne } from "../handler/handlers.js";

const addProduct = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  req.body.imgCover = req.files.imgCover[0].filename;
  req.body.images = req.files.images.map((img) => img.filename);

  let product = new productModel(req.body);
  await product.save();
  res.json({ message: "success", product });
});

const updateProduct = catchError(async (req, res, next) => {
  if (req.body.title) req.body.slug = slugify(req.body.title);
  if (req.files.imgCover) req.body.imgCover = req.files.imgCover[0].filename;
  if (req.files.images)
    req.body.images = req.files.images.map((img) => img.filename);
  let product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  !product && res.status(404).json({ message: "product not found" });
  product && res.json({ message: "success", product });
});

const getSingleProduct = getSingleOne(productModel);

const getAllProducts = getAllOne(productModel);

const deleteProduct = deleteOne(productModel);

export {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
