import mongoose from "mongoose";
import express, { Express } from "express";
import cors from "cors";
import todoRoutes from "./routes";

const app: Express = express();
const PORT: number | String = process.env.PORT || 4000;
app.use(cors());
app.use(todoRoutes);
const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustertodo.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { 
    useNewUrlParser: true,
     useUnifiedTopology: true
     };
mongoose.set("useFindAndModify", false);

mongoose
  .connect(uri, options)
  .then(() => {
    return app.listen(PORT, () =>
      console.log(`served running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    throw error;
  });
