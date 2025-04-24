import { Router } from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from '../controllers/task.controller.js';
import authorizeUser from '../../../components/user-service/middleware/authorizeUser.js';

const task = Router();

task.use(authorizeUser);

task.post('/', createTask);
task.get('/', getTasks);
task.put('/:id', updateTask);
task.delete('/:id', deleteTask);

export default task;