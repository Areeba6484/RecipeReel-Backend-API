import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import recipeRouter from './routs/recipesRouts.js';
import userRouter from './routs/usersRouts.js';
import categoryRouter from './routs/categoryRouts.js';
import reviewRouter from './routs/reviewsRouts.js';
import dbConnect from './config/database.js';
import { apiRateLimit } from './middlewares/api-limit.js';
import dotenv from "dotenv";

dotenv.config();

var corsOptions = {
  origin: process.env.WEB_APP_URL,
  optionsSuccessStatus: 200
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("common"));




app.use("/", categoryRouter);
app.use("/", recipeRouter);
app.use("/reviews", reviewRouter);
app.use("/",apiRateLimit, userRouter);

dbConnect();

const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});


