import { Router } from "express";
import assignClientAgent from "../../controllers/clients/assignClientAgent.js";

const router = Router();

router.put("/assign", assignClientAgent);

export default router;
