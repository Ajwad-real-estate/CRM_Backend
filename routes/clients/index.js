import { Router } from "express";
import authorizeUser from "../../middlewares/authorizeUser.js";
// import authorizeManager from "../../middlewares/authorizeManager.js";
import createSingle from "./createClient.js";
import createMultiple from "./createClients.js";
import getClients from "./getClients.js";
import getClientById from "./getClientById.js";
import deleteClient from "./deleteClient.js";
import authorizeManager from "../../middlewares/authorizeManager.js";
import updateClientById from "./updateClientById.js";
import assignClientAgent from "./assignClientAgent.js";

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
