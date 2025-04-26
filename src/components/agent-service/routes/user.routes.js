import { Router } from "express";
import {
  getUserData,
  updateUserData,
  getUserDataById,
  updateUserDataById
} from "../controllers/user.controller.js";
import {authorizeUser} from "../../user-service/middleware/authorizeUser.js";
import {authorizeManager} from "../../user-service/middleware/authorizeManager.js";

const user = Router();

// For logged-in user
user.get("/profile",authorizeManager ,getUserData);
user.put("/profile", authorizeManager,updateUserData);

// For admin usage
user.get("/:id",authorizeManager, getUserDataById);
user.put("/:id", authorizeManager,updateUserDataById);

export default user;