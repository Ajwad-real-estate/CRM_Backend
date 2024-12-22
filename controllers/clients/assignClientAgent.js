import { getPool } from "../../configs/dbConfig.js";

const assignClientAgent = async (req, res) => {
  const { agents, clients } = req.body;

  if (!Array.isArray(agents) || agents.length < 1) {
    return res.status(400).json({ message: "No valid agents provided." });
  }

  if (!Array.isArray(clients) || clients.length < 1) {
    return res.status(400).json({ message: "No valid clients provided." });
  }

  try {
    const pool = await getPool();

    // Step 1: Separate agents into two groups
    const agentsWithQuantity = agents.filter(
      (agent) => typeof agent.quantity === "number" && agent.quantity > 0
    );
    const agentsWithoutQuantity = agents.filter(
      (agent) => typeof agent.quantity === "number" && agent.quantity === 0
    );

    let currentClientIndex = 0;
    let agentIndex = 0;
    const assignments = [];

    const assignTime = new Date().toISOString();

    // Step 2: Assign clients to agents with `quantity > 0`
    if (agentsWithQuantity.length > 0) {
      for (const agent of agentsWithQuantity) {
        for (let i = 0; i < agent.quantity; i++) {
          if (currentClientIndex >= clients.length) break;

          const clientId = clients[currentClientIndex];
          assignments.push({ agentId: agent.id, clientId });

          currentClientIndex++;
        }
      }
    }

    // Step 3: Distribute remaining clients to agents with `quantity === 0` using a round-robin
    if (agentsWithoutQuantity.length > 0) {
      while (currentClientIndex < clients.length) {
        const agent = agentsWithoutQuantity[agentIndex];
        const clientId = clients[currentClientIndex];

        assignments.push({ agentId: agent.id, clientId });

        currentClientIndex++;
        agentIndex = (agentIndex + 1) % agentsWithoutQuantity.length;
      }
    }

    // Step 4: Execute all assignments in bulk
    const query = `
        UPDATE client
        SET agent_id = CASE id
          ${assignments
            .map(
              ({ clientId, agentId }) =>
                `WHEN '${clientId}' THEN '${agentId}'::uuid`
            )
            .join(" ")}
        END,
        assign_time = $1
        WHERE id IN (${assignments
          .map(({ clientId }) => `'${clientId}'`)
          .join(", ")});
      `;

    await pool.query(query, [assignTime]);

    res
      .status(200)
      .json({ message: "Clients assigned successfully.", assignments });
  } catch (error) {
    console.error("Error in assignClientAgent controller:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export default assignClientAgent;
