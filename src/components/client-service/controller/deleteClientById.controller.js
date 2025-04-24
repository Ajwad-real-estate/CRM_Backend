import { deleteClientByIdService } from "../services/deleteClientById.services.js";

const deleteClientById = async (req, res) => {
  const { clientId } = req.params;

  if (!clientId) {
    return res.status(400).json({ message: "Client Id is required." });
  }

  try {
    const result = await deleteClientByIdService(clientId);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Client not found." });
    }

    res.status(200).json({ message: "Client deleted successfully." });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export default deleteClientById;