import mongoose from "mongoose";
export const dbConnection = () => {
  mongoose.connect("mongodb+srv://hadyawny:hadyawny123@cluster0.vbkki8p.mongodb.net/ecommerce")
    .then(() => {
      console.log("Mongodb is connected");
    })
    .catch((err) => {
      console.log("database error", err);
    });
};


