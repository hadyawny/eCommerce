import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne, getAllOne, getSingleOne } from "../handler/handlers.js";
import { reviewModel } from "../../../database/models/review.model.js";
import { AppError } from "../../utils/appError.js";

const addReview = catchError(async (req, res, next) => {
  req.body.user=req.user._id
  let isReviewExist = await reviewModel.findOne({user: req.user._id, product: req.body.product})
  if (isReviewExist) return next(new AppError("Review already exists",))
  let review = new reviewModel(req.body);
  await review.save();
  res.json({ message: "success", review });
});

const updateReview = catchError(async (req, res, next) => {
  let review = await reviewModel.findOneAndUpdate(
    {_id:req.params.id,user:req.user._id},
    req.body,
    { new: true }
    );
    !review && res.status(404).json({ message: "review not found" });
    review && res.json({ message: "review", review });
  });

const getAllReviews= getAllOne(reviewModel);

const getSingleReview = getSingleOne(reviewModel);

const deleteReview = deleteOne(reviewModel);

export {
  addReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
