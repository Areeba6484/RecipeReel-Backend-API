import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const dbConnect = () => {
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Database connected successfully");
  }).catch((error) => {
    console.error("Database connection failed:", error);
  });
}
dbConnect();


export default dbConnect;