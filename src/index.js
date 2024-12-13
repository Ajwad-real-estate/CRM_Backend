import { Router } from "express";
import authRoutes from "./routes/auth/index.js";
import getSalesAgents from "../controllers/SalesAgents/getSalesAgents.controller.js";
import createSalesAccount from "../controllers/SalesAgents/createSalesAccount.controller.js";
import rolesTitles from "../controllers/SalesAgents/rolesTitles.controller.js";
import authorizeUser from "../middlewares/authorizeUser.js";

const router = Router();

// Base route
router.get("/", (req, res) => {
  res.send("Welcome to the CRM API.");
});

// Auth routes
router.use("/auth", authRoutes);
router.use("/get-sales-agents-details", authorizeUser,getSalesAgents);// need it make it authorized to manager only?
router.use("/roles-titles", rolesTitles);// need it make it authorized to manager only?
router.post("/create-sales-account", createSalesAccount); // Apply authorizeManager middleware here


// // Example: Route accessible only by authenticated admin users
// router.get(
//   "/test",
//   // isAuthenticated("user"), // Ensure the user is authenticated
//   authorizeUser("admin"), // Ensure the user is an admin
//   (req, res) => {
//     res.status(200).json({ message: "Welcome, admin user!" });
//   }
// );



export default router;
