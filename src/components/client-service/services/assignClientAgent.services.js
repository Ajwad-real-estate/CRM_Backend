import { assignClientsToAgentsQuery } from "../utils/queries/clientQueries.js";
import { formatAgentAssignments } from "../utils/helpers/clientHelpers.js";

export const assignClientAgentService = async (agents, clients) => {
  // Step 1: Separate agents into two groups
  const agentsWithQuantity = agents.filter(
    (agent) => typeof agent.quantity === "number" && agent.quantity > 0
  );
  const agentsWithoutQuantity = agents.filter(
    (agent) => typeof agent.quantity === "number" && agent.quantity === 0
  );

  // Calculate assignments using helper function
  const assignments = formatAgentAssignments(agentsWithQuantity, agentsWithoutQuantity, clients);

  // Execute assignments in database
  const assignTime = new Date().toISOString();
  await assignClientsToAgentsQuery(assignments, assignTime);

  return { assignments };
};