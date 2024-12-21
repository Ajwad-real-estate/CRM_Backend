import { Router } from "express";
import getCities from "../../controllers/things/city.controller.js";


const router = Router();

router.use('/city', getCities);

export default router;
