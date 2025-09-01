import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import recipeRouter from './routs/recipes.routs.js';
import userRouter from './routs/users.routs.js';
import categoryRouter from './routs/category.routs.js';
import reviewRouter from './routs/reviews.routs.js';
import dbConnect from './config/database.js';
import { apiRateLimit } from './middlewares/api-limit.js';
import config from './config/config.js';

var corsOptions = {
  origin: config.webAppUrl,
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

const port = config.port || 5000;
const host = config.host || "localhost";

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port} in ${config.env} mode`);
});


