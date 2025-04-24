import { getPool } from "../../../db/db.js";
import { agentQueries } from "../queries/dashboard.queries.js";

export const getAgentDashboard = async (req, res) => {
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
      qualifiedClientsResult,
      reservedClientsResult,
      doneClientsResult,
    ] = await Promise.all([
      pool.query(agentQueries.target, [agentId]),
      pool.query(agentQueries.followUp, [agentId]),
      pool.query(agentQueries.meeting, [agentId]),
      pool.query(agentQueries.followMeet, [agentId]),
      pool.query(agentQueries.email, [agentId]),
      pool.query(agentQueries.newClients, [agentId]),
      pool.query(agentQueries.qualifiedClients, [agentId]),
      pool.query(agentQueries.reservedClients, [agentId]),
      pool.query(agentQueries.doneClients, [agentId]),
    ]);

    const dashboardData = {
      target: parseInt(targetResult.rows[0].target, 10),
      followUpCount: parseInt(followUpResult.rows[0].count, 10),
      meetingCount: parseInt(meetingResult.rows[0].count, 10),
      followMeetCount: parseInt(followMeetResult.rows[0].count, 10),
      emailCount: parseInt(emailResult.rows[0].count, 10),
      newClientsCount: parseInt(newClientsResult.rows[0].count, 10),
      qualifiedClientsCount: parseInt(qualifiedClientsResult.rows[0].count, 10),
      reservedClientsCount: parseInt(reservedClientsResult.rows[0].count, 10),
      doneClientsCount: parseInt(doneClientsResult.rows[0].count, 10),
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Error fetching agent dashboard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};