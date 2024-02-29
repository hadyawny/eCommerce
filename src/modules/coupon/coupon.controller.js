import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne, getAllOne, getSingleOne } from "../handler/handlers.js";
import { AppError } from "../../utils/appError.js";
import { couponModel } from "../../../database/models/coupon.model.js";

const addCoupon = catchError(async (req, res, next) => {
  let isCouponExist = await couponModel.findOne({code: req.body.code})
  if (isCouponExist) return next(new AppError("coupon already exists",))
  let coupon = new couponModel(req.body);
  await coupon.save();
  res.json({ message: "success", coupon });
});

const updateCoupon = catchError(async (req, res, next) => {
  let coupon = await couponModel.findOneAndUpdate(
    {_id:req.params.id},
    req.body,
    { new: true }
    );
    !coupon && res.status(404).json({ message: "coupon not found" });
    coupon && res.json({ message: "coupon", coupon });
  });

const getAllCoupons= getAllOne(couponModel);

const getSingleCoupon = getSingleOne(couponModel);

const deleteCoupon = deleteOne(couponModel);

export {
  addCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
};
