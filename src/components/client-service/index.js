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

const clientRoute = Router();

clientRoute.use(authorizeUser);
clientRoute.use(assignClientAgent);

clientRoute.use(
  // authorizeManager// ,
  createSingle
);
clientRoute.use(
  // authorizeManager,
  createMultiple);
clientRoute.use(getClients);
clientRoute.use(getClientById);
clientRoute.use(updateClientById); // @ yousef eslam
clientRoute.use(authorizeManager, deleteClient);

export default clientRoute;
