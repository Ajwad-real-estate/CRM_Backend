import { Router } from "express";
import registerRoute from "./register.js";
import loginRoute from "./login.js";
import refreshTokenRoute from "./token.js";
import logoutRoute from "./logout.js";
import reGemail from "../../controllers/auth/reGemail.controller.js";
import rePassword from "../../controllers/auth/rePassword.controller.js";
import authorizeUser from "../../middlewares/authorizeUser.js";
import authorizeManager from "../../middlewares/authorizeManager.js";
import reGemailById from "../../controllers/auth/reGemailById.controller.js";
import rePasswordById from "../../controllers/auth/rePasswordById.controller.js";
// import userData from "../SalesAgents/userData.js";

const router = Router();

router.use(registerRoute);
router.use(loginRoute);
router.use(refreshTokenRoute);
router.use(logoutRoute);
router.use('/regmail', authorizeUser, reGemail)
router.use('/repass', authorizeUser, rePassword)
router.use('/regmailbyid/:id', authorizeManager, reGemailById)
router.use('/repassbyid/:id', authorizeManager, rePasswordById)
// router.use(userData)
export default router;
