import {
  getUserByIdService,
  updateUserByIdService
} from "../services/user.service.js";

// For self data
export const getUserData = async (req, res) => {
  try {
    const result = await getUserByIdService(req.user.agentId);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("Controller error (getUserData):", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserData = async (req, res) => {
  try {
    const result = await updateUserByIdService(req.user.agentId, req.body);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("Controller error (updateUserData):", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// For admin to access others' data
export const getUserDataById = async (req, res) => {
  try {
    const result = await getUserByIdService(req.params.id);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("Controller error (getUserDataById):", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserDataById = async (req, res) => {
  try {
    const result = await updateUserByIdService(req.params.id, req.body);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("Controller error (updateUserDataById):", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
