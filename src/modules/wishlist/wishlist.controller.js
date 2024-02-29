import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";

const addToWishlist = catchError(async (req, res, next) => {
  let wishlist = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { wishlist: req.body.product } },
    { new: true }
  ).populate('wishlist')
  !wishlist && res.status(404).json({ message: "wishlist not found" });
  wishlist && res.json({ message: "wishlist", wishlist:wishlist.wishlist });
});

const removeFromWishlist = catchError(async (req, res, next) => {
  let wishlist = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { wishlist: req.params.id } },
    { new: true }
  ).populate('wishlist')
  !wishlist && res.status(404).json({ message: "wishlist not found" });
  wishlist && res.json({ message: "wishlist", wishlist:wishlist.wishlist });
});

const getLoggedUserWishlist = catchError(async (req, res, next) => {
  let {wishlist} = await userModel.findById(req.user._id).populate("wishlist")
  !wishlist && res.status(404).json({ message: "wishlist not found" });
  wishlist && res.json({ message: "wishlist", wishlist });
});

export { addToWishlist,removeFromWishlist , getLoggedUserWishlist };

