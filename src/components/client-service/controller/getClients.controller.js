import { getClientsService } from "../services/getClients.services.js";

const getClients = async (req, res) => {
  const user = req.user;
  const { status, assigned } = req.query;
  console.log("Query params:", { status, assigned });

  try {
    const clients = await getClientsService(user, { status, assigned });
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error in getClients controller:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export default getClients;