import mongoose from "mongoose";
import express, { Express } from "express";
import cors from "cors";
import todoRoutes from "./routes";
import dotenv from "dotenv";
dotenv.config();
const app: Express = express();
const PORT: number | String = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use(todoRoutes);
// const uri: string = 'mongodb://localhost:27017/myTodos'
const MONGO_URL: string =
  `mongodb+srv://vickymlucky:${process.env.MONGO_PASSWORD}@cluster0.xaqfsym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`served running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.error(error);
  });
