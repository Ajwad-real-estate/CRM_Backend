import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import authorizeUser from "../../../components/user-service/middleware/authorizeUser.js";

const router = Router();

router.use(authorizeUser);
router.get("/", getDashboard);

export default router;