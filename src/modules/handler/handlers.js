import { catchError } from "../../middleware/catchError.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";

export const deleteOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findByIdAndDelete(req.params.id);
    !document && res.status(404).json({ message: "document not found" });
    document && res.json({ message: "success", document });
  });
};


export const getSingleOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findById(req.params.id);
    !document && res.status(404).json({ message: "document not found" });
    document && res.json({ message: "success", document });
  });
};

export const getAllOne = (model) => {
  return catchError(async (req, res, next) => {

    let filterSubCategory = {};
    if (req.params.category) {
      filterSubCategory.category = req.params.category;
    }

    let apiFeatures = new ApiFeatures(model.find(filterSubCategory), req.query)
      .fields()
      .filter()
      .pagination()
      .search()
      .sort();

    let document = await apiFeatures.mongooseQuery;

    !document && res.status(404).json({ message: "document not found" });
    document && res.json({ message: "success",page: apiFeatures.pageNumber, document });
  });
};
