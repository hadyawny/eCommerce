import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
      minLength: [2, "too short review text"],
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    rate: {
        type: Number,
        max: 5,
        min: 0,
      },
    
  },
  { timestamps: true }
);

schema.pre(/^find/,function(){
  this.populate("user","name")
})


export const reviewModel = mongoose.model("review", schema);
