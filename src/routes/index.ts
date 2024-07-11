import { Router } from "express";
import {
  addTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todos";
const router: Router = Router();
router.get("/todos", getTodos);
router.get("/todo/:id", getTodo);
router.post("/add-todo", addTodo);
router.put("/edit-todo/:id", updateTodo);
router.delete("/delete-todo/:id", deleteTodo);
export default router;

