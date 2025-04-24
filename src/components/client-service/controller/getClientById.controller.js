import { getClientByIdService } from "../services/getClientById.services.js";

const getClientById = async (req, res) => {
  const { clientId } = req.params;

  if (!clientId) {
    return res.status(400).json({ message: "Client Id is required." });
  }

  try {
    const client = await getClientByIdService(clientId);
    
    if (!client) {
      return res.status(404).json({ message: "Client not found." });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error("Error fetching client:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export default getClientById;