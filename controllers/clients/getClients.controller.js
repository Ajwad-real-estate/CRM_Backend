import { getClientsService } from "../../services/clientServices/getClients.services.js";

const getClients = async (req, res) => {
  try {
    const user = req.user;
    const clients = await getClientsService(user);

    res.status(200).json(clients);
  } catch (error) {
    console.error("Error in getClients controller:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export default getClients;
