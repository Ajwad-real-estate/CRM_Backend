import { getAgentDashboard } from "./agentDashboard.controller.js";
import { getManagerDashboard } from "./managerDashboard.controller.js";

export const getDashboard = async (req, res) => {
  const userRole = req.user.roleId;
  if (userRole === 2) {
    return getManagerDashboard(req, res);
  } else {
    return getAgentDashboard(req, res);
  }
};