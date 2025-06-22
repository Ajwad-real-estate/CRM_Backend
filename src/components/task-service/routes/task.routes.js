import { Router } from "express";
import {
  createTask,
  getTasks,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { authorizeUser } from "../../user-service/middleware/authorizeUser.js";

const task = Router();

task.use(authorizeUser);

task.post("/", createTask);
// task.get('/', getTasks);
task.get("/", getAllTasks);
task.put("/:id", updateTask);
task.delete("/:id", deleteTask);

export default task;
