import { Router } from "express";
import authorizeUser from "../middlewares/authorizeUser.js";

<<<<<<< HEAD
import {
  getAllTasks,
  addNewTask,
  getTask,
  delTask,
  updateTask,
} from "../controllers/taskController.js";
=======

import { getAllTasks, addNewTask, getTask, updateTask, delTask } from '../controllers/taskController.js'
>>>>>>> e143da6 (update)

const router = Router();

router.use(authorizeUser);

// all tasks
router.get("/tasks", getAllTasks);
router.post("/tasks", addNewTask);

// single task
<<<<<<< HEAD
router.put("/tasks/:id", updateTask);
// router.delete('/tasks/:id', delTask);
=======
router.delete('/tasks/:id', delTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', delTask);

>>>>>>> e143da6 (update)

export default router;
