import { deleteClientQuery } from "../utils/queries/clientQueries.js";

export const deleteClientByIdService = async (clientId) => {
  return await deleteClientQuery(clientId);
};

