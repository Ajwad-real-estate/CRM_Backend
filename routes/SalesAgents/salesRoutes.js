import { Router } from "express";
// import authorizeUser from '../../middlewares/authorizeUser.js';
// import getSalesAgents from "../controllers/SalesAgents/getSalesAgents";
import getSalesAgents from "../../controllers/SalesAgents/getSalesAgents.controller.js";
import createSalesAccount from "../../controllers/SalesAgents/createSalesAccount.controller.js";
import { getUserDataById, updateUserDataById } from "../../controllers/SalesAgents/userDataById.controller.js";
// import authenticate from "../middleware/authenticate.js"; // Middleware for token validation
// import getSalesAgentsMiddleWare from "../../middlewares/getSalesAgents.js";
import authorizeManager from "../../middlewares/authorizeManager.js";
import authorizeUser from "../../middlewares/authorizeUser.js";
import rolesTitles from "../../controllers/SalesAgents/rolesTitles.controller.js";

// const router = express.Router();
const router = Router();
router.use(authorizeUser)

// Route to fetch sales agent details (restricted to managers)
// router.get("/agents", getSalesAgentsMiddleWare, getSalesAgents);
router.get("/get-sales-agents-details", getSalesAgents);
router.post("/create-sales-account", createSalesAccount);
router.get("/agentDetails/:id"
    , authorizeManager
    , getUserDataById
)
router.put("/agentDetails/:id"
    , authorizeManager
    , updateUserDataById
)
router.use("/roles", rolesTitles)
// router.post("/agentDetails/:id", userDataById)
// router.get("/agentDetails", )
// router.post("/agentDetails", )


export default router;
