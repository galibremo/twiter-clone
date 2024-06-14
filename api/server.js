import app from "./app.js";
import { connectDatabase } from "./db/database.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = 3000;
connectDatabase();

app.listen(port, () => {
  console.log(`server running on ${port}!!`);
});
