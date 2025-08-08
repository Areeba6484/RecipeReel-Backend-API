import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import recipeRouter from './routs/recipes.routs.js';
import userRouter from './routs/users.routs.js';
import categoryRouter from './routs/category.routs.js';
import reviewRouter from './routs/reviews.routs.js';
import dbConnect from './config/database.js';

var corsOptions = {
  origin: process.env.WEBAPP_URL,
  optionsSuccessStatus: 200
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("common"));




app.use("/", categoryRouter);
app.use("/", userRouter)
app.use("/", recipeRouter);
app.use("/reviews", reviewRouter);

dbConnect();

const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});


