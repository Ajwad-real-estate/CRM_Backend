import { Router } from "express";
import { rolesTitles } from "../controllers/roles.controller.js";

const role = Router();

role.get("/available-roles", rolesTitles);

export default role;
