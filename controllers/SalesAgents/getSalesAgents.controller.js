import { getPool } from "../../configs/dbConfig.js";

const getSalesAgents = async (req, res) => {
  console.log("getSalesAgentsFun")
  const pool = await getPool();
  const { agentId } = req.user; // Assume `req.user` is populated via middleware

  // const manager_id_from_userpayload = req.user.agentId;
  console.log(agentId);
  try {
    // Example: Validate that the user is a manager
    // const { roleId } = req.user; // Assume `req.user` is populated via middleware
    // if (roleId !== "manager") {
    //   return res.status(403).json({ message: "Access denied." });
    // }

    // Query to fetch agent details
    //     const agentsQuery = `
    //   SELECT *
    //   FROM agent
    //   WHERE role_id = 'sales'; -- Assuming 'sales' represents sales agents
    // `;
    // const agentsQuery = `SELECT id,name, role_id,status FROM agent;`;
    const agentsQuery = `
    SELECT
    agent.id,
    agent.name,
    role.title,
    agent.status,
    agent.manager_id
FROM
    agent
JOIN
    role
ON
    agent.role_id = role.id
WHERE
    role.title IN 
    ('Sales Agent', 'Team Lead','Senior Sales Agent', 'Intern',
    'Field Sales Agent', 'Online Sales Specialist')
    AND agent.manager_id = $1; 
    `;

    // WHERE
    //     role.title IN ('Sales Agent', 'Senior Sales Agent','Intern','Field Sales Agent','Online Sales Specialist')`;
    const { rows: agents } = await pool.query(agentsQuery
      , [agentId]
    );
    console.log(agents)
    // Respond with the sales agents' details
    res.status(200).json({ agents });
  } catch (error) {
    console.error("Error fetching sales agents:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export default getSalesAgents;
