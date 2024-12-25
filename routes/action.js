import { Router } from 'express';
import authorizeUser from '../middlewares/authorizeUser.js';

import {  getAllActions , addNewAction, getAction, updateAction, getActionsHistoryOfClient } from '../controllers/actionController.js'

const router = Router();

router.use(authorizeUser);


// all tasks
router.get('/actions', getAllActions);
router.post('/actions', addNewAction);

// single task
// router.get('/task:id', getAction);
router.put('/actions/:id', updateAction);
router.get('/actionsHistoryOfClient/:id', getActionsHistoryOfClient); // yousef eslam


export default router;
