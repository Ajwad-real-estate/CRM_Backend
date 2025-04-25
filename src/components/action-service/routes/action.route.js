// routes/actionRoutes.js
import express from 'express';
import * as actionController from '../controller/action.controller.js';
import {authorizeUser} from "../../../components/user-service/middleware/authorizeUser.js";

const action = express.Router();

// Apply authentication middleware to all routes
action.use(authorizeUser);


// Action routes
action.get('/', actionController.getAllActions);
action.post('/', actionController.addNewAction);
action.get('/:id', actionController.getAction);
action.put('/:id', actionController.updateAction);
action.get('/client/:id/history', actionController.getActionsHistoryOfClient);
action.get('/client/:id/incomplete', actionController.getActionsNotcompletedOfClient);

export default action;