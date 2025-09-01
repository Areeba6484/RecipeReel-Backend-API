import mongoose from "mongoose";
import config from "./config.js";


const dbConnect = () => {
  mongoose.connect(config.dbUri).then(() => {
    console.log("Database connected successfully");
  }).catch((error) => {
    console.error("Database connection failed:", error);
  });
}
dbConnect();


export default dbConnect;