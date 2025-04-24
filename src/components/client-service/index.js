import { Router } from "express";
import authorizeUser from "../../components/user-service/middleware/authorizeUser.js";
import createSingle from "./routes/createClient.js";
import createMultiple from "./routes/createClients.js";
import getClients from "./routes/getClients.js";
import getClientById from "./routes/getClientById.js";
import deleteClient from "./routes/deleteClient.js";
import authorizeManager from "../../components/user-service/middleware/authorizeManager.js";
import updateClientById from "./routes/updateClientById.js";
import assignClientAgent from "./routes/assignClientAgent.js";

const router = Router();

router.use(authorizeUser);
router.use(assignClientAgent);

router.use(
  // authorizeManager// ,
  createSingle
);
router.use(
  // authorizeManager,
  createMultiple);
router.use(getClients);
router.use(getClientById);
router.use(updateClientById); // @ yousef eslam
router.use(authorizeManager, deleteClient);

export default router;
