import { getClientsQuery } from "../utils/queries/clientQueries.js";
import { formatStatusFilter } from "../utils/helpers/clientHelpers.js";

export const getClientsService = async (user, filters) => {
  const { roleId, agentId } = user;
  const { status, assigned } = filters;

  try {
    // Format the status filter
    const statusFilter = formatStatusFilter(status);
    
    // Get clients based on role and filters
    const clients = await getClientsQuery(roleId, agentId, statusFilter, assigned);
    
    return clients;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Unable to fetch clients. Please try again.");
  }
};