import { Router } from 'express';
import authorizeUser from '../middlewares/authorizeUser.js';

import { getAllTasks, addNewTask, getTask, delTask, updateTask } from '../controllers/taskController.js'

const router = Router();

router.use(authorizeUser);


// all tasks
router.get('/tasks', getAllTasks);
router.post('/tasks', addNewTask);

// single task
router.put('/tasks/:id', updateTask);
// router.delete('/tasks/:id', delTask);


export default router;
