import { Router } from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from '../controllers/task.controller.js';
import authorizeUser from '../../../components/user-service/middleware/authorizeUser.js';

const router = Router();

router.use(authorizeUser);

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;