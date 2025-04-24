import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import authorizeUser from "../../../components/user-service/middleware/authorizeUser.js";

const dashboardRoute = Router();

dashboardRoute.use(authorizeUser);
dashboardRoute.get("/", getDashboard);

export default dashboardRoute;