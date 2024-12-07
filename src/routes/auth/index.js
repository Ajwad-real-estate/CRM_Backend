import { Router } from "express";
import registerRoute from "./register.js";
import loginRoute from "./login.js";
import refreshTokenRoute from "./token.js";
import logoutRoute from "./logout.js";

const router = Router();

router.use(registerRoute);
router.use(loginRoute);
router.use(refreshTokenRoute);
router.use(logoutRoute);

export default router;
