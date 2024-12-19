import { Router } from 'express';
import authorizeUser from '../middlewares/authorizeUser.js';


import { getAllTasks, addNewTask, getTask, updateTask, delTask } from '../controllers/taskController.js'

const router = Router();

router.use(authorizeUser);


// all tasks
router.get('/tasks', getAllTasks);
router.post('/tasks', addNewTask);

// single task
router.delete('/tasks/:id', delTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', delTask);


export default router;
