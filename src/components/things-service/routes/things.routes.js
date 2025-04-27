import { Router } from "express";
import * as controller from "../controller/things.controller.js";

const things = Router();

things.get('/city', controller.getCities);
things.get('/agent-statuses', controller.getAgentStatuses);
things.get('/task-statuses', controller.getTaskStatuses);

export default things;
