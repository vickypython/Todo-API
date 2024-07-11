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
const getTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body=req.params.id
    const todo: ITodo[] | null = await Todo.findById(body);
    res.send(200).json({ message: "Todo return", todo: todo });
  } catch (error) {
    throw error;
  }
};


//getTodos return the using find 
//getTodo
//addTodo -create a new model using new keyword instead of repeat we say const body=req.body as pick<type hten use |> new({
// name:body.name}) return the new created todo
//update Todo-you pick the params from the url router.put('/update/todo/:id',updateTodo) omit
//const {params:{id:_id},body}=req 
//delete todo here you pass the id 






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

//creating
const createOne = async (req: Request, res: Response): Promise<void> => {
  try {
    // const {params:{
    //   id},body}=req

    const allTodos: ITodo[] = await Todo.find();
    res.status(200).json({ todos: allTodos });
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
const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(
      req.params.id
    );
    const allTodos: ITodo[] = await Todo.find();
    res.status(200).json({
      message: "Todo deleted succcessful",
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};
export { getTodos, getTodo, addTodo, updateTodo, deleteTodo };
