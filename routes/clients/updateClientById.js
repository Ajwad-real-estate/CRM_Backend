import { Router } from "express";
import updateClientById from "../../controllers/clients/updateClientById.controller.js";


const router = Router();

router.put("/:clientId", updateClientById); //@yousef eslam 

export default router;
