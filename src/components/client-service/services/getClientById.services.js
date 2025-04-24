import { getClientByIdQuery } from "../utils/queries/clientQueries.js";

export const getClientByIdService = async (clientId) => {
  const result = await getClientByIdQuery(clientId);
  if (result.length === 0) {
    return null;
  }
  return result[0];
};