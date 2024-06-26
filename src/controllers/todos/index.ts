import { Request, Response } from "express";
import { ITodo } from "./../../types/todo";
import Todo from "../../models/todo";

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};
const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    //creating an object corresponding to the database model schema
    const body = req.body as Pick<ITodo, "name" | "description" | "status">;

    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
    });
    //save the todo with save method
    const newTodo: ITodo = await todo.save();
    //find that todo
    const allTodos: ITodo[] = await Todo.find();
    //return a response
    res
      .status(201)
      .json({ message: "Todo addded", todo: newTodo, todos: allTodos });
  } catch (error) {
    throw error;
  }
};
const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    );
    //return updated data to the user
    const allTodos: ITodo[] = await Todo.find();
    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};
const deleteTodo=async(req:Request,res:Response):Promise<void>=>{
    try {
      
      const deletedTodo:ITodo | null= await Todo.findByIdAndDelete(
        req.params.id
      )
      const allTodos:ITodo[]= await Todo.find()
      res.status(200).json({
        message:"Todo deleted succcessful",
        todo: deletedTodo,
        todos: allTodos,
      })
    } catch (error) {
       throw error 
    }
}
export {getTodos,addTodo,updateTodo,deleteTodo,}