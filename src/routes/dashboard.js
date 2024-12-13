import { Router } from "express";

const router = Router ();
import getDashboard from '../../controllers/dashboard/dashboardController.js';

router.get('/dashboard', getDashboard);



export default router;
