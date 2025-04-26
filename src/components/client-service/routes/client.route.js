import { Router } from "express";
import * as controller from "../controller/client.contoller.js";
import { authorizeUser } from "../../user-service/middleware/authorizeUser.js";
import { authorizeManager } from "../../user-service/middleware/authorizeManager.js";

const clientRoute = Router();

clientRoute.use(authorizeUser);

clientRoute.put("/assign", controller.assignClientAgent);
clientRoute.post("/bulk", controller.createMultipleClients);
clientRoute.post("/createClient", controller.createClient);
clientRoute.delete("/:clientId",authorizeManager ,controller.deleteClientById);
clientRoute.get("/:clientId", controller.getClientById);
clientRoute.get("/getClient", controller.getClients);
clientRoute.put("/:clientId", controller.updateClientById); //@yousef eslam 

export default clientRoute