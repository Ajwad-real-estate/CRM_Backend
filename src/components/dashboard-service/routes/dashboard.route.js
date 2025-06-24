import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import {authorizeUser} from "../../../components/user-service/middleware/authorizeUser.js";
import { getSalesDashboard } from "../controllers/salesDashboard.controller.js";
import {authorizeManager} from "../../../components/user-service/middleware/authorizeManager.js";

const dashboardRoute = Router();

dashboardRoute.get("/", authorizeUser, getDashboard);

dashboardRoute.get("/salesDashboard/:id",authorizeUser,getSalesDashboard);

export default dashboardRoute;