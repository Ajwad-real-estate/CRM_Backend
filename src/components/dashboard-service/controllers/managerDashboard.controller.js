import { getPool } from "../../../db/db.js";
import { managerQueries } from "../queries/dashboard.queries.js";

export const getManagerDashboard = async (req, res) => {
  const pool = await getPool();
  const agentId = req.user.agentId;

  try {
    const [
      targetResult,
      followUpResult,
      meetingResult,
      followMeetResult,
      emailResult,
      newClientsResult,
      newAssignedClientsResult,
      qualifiedClientsResult,
      reservedClientsResult,
      doneClientsResult,
    ] = await Promise.all([
      pool.query(managerQueries.target, [agentId]),
      pool.query(managerQueries.followUp),
      pool.query(managerQueries.meeting),
      pool.query(managerQueries.followMeet),
      pool.query(managerQueries.email),
      pool.query(managerQueries.newClients),
      pool.query(managerQueries.newAssignedClients),
      pool.query(managerQueries.qualifiedClients),
      pool.query(managerQueries.reservedClients),
      pool.query(managerQueries.doneClients),
    ]);

    const dashboardData = {
      target: parseInt(targetResult.rows[0].target, 10),
      followUpCount: parseInt(followUpResult.rows[0].count, 10),
      meetingCount: parseInt(meetingResult.rows[0].count, 10),
      followMeetCount: parseInt(followMeetResult.rows[0].count, 10),
      emailCount: parseInt(emailResult.rows[0].count, 10),
      newClientsCount: parseInt(newClientsResult.rows[0].count, 10),
      newAssignedClientsCount: parseInt(newAssignedClientsResult.rows[0].count, 10),
      qualifiedClientsCount: parseInt(qualifiedClientsResult.rows[0].count, 10),
      reservedClientsCount: parseInt(reservedClientsResult.rows[0].count, 10),
      doneClientsCount: parseInt(doneClientsResult.rows[0].count, 10),
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Error fetching manager dashboard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};