import { Router } from 'express';
import authorizeUser from '../middlewares/authorizeUser.js';

import {  getAllActions , addNewAction, getAction, updateAction } from '../controllers/actionController.js'

const router = Router();

router.use(authorizeUser);


// all tasks
router.get('/actions', getAllActions);
router.post('/actions', addNewAction);

// single task
// router.get('/task:id', getAction);
router.put('/actions/:id', updateAction);


export default router;
