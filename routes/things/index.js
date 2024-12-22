import { Router } from "express";
import getCities from "../../controllers/things/city.controller.js";
import Statues from "../../controllers/things/statues.controller.js";


const router = Router();

router.use('/city', getCities);
router.use('/agent-statuses', Statues);

export default router;
