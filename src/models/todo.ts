import { ITodo } from "./../types/todo";
import { model, Schema } from "mongoose";
const todoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);
export default model<ITodo>("Todo", todoSchema);
//use this model to interact with the db
//The model in this act has the collection in mongodb
//like the way you do it manually you create a db then a collection the tables in sql
//mongoose.model<pass the types>()