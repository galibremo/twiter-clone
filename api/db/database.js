import mongoose from "mongoose";
import "dotenv/config";

export const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to Database!");
    })
    .catch((err) => {
      console.log(err);
    });
};
