import { updateClientByIdService } from "../../services/updateClientById.services.js";

const updateClient = async (req, res) => {
  const { clientId } = req.params;
  const updates = req.body;

  if (!clientId) {
    return res.status(400).json({ message: "Client Id is required." });
  }

  try {
    const result = await updateClientByIdService(clientId, updates);
    
    if (!result) {
      return res.status(404).json({ message: "Client not found." });
    }
    
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export default updateClient;