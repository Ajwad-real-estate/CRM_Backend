import { getRolesLowerThanUser } from "../services/roles.service.js";

export const rolesTitles = async (req, res) => {
    try {
      const result = await getRolesLowerThanUser(req.user.roleId);
      res.status(result.status).json(result.body);
    } catch (err) {
      console.error("Controller Error:", err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };