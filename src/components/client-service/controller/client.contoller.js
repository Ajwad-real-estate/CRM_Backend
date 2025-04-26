import { assignClientAgentService } from "../services/assignClientAgent.services.js";
import { createClientService } from "../services/createClient.services.js";
import { deleteClientByIdService } from "../services/deleteClientById.services.js";
import { getClientByIdService } from "../services/getClientById.services.js";
import { getClientsService } from "../services/getClients.services.js";
import { updateClientByIdService } from "../services/updateClientById.services.js";



export const assignClientAgent = async (req, res) => {
  const { agents, clients } = req.body;

  if (!Array.isArray(agents) || agents.length < 1) {
    return res.status(400).json({ message: "No valid agents provided." });
  }

  if (!Array.isArray(clients) || clients.length < 1) {
    return res.status(400).json({ message: "No valid clients provided." });
  }

  try {
    const results = await assignClientAgentService(agents, clients);
    res.status(200).json({ 
      message: "Clients assigned successfully.", 
      assignments: results.assignments 
    });
  } catch (error) {
    console.error("Error in assignClientAgent controller:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createClient = async (req, res) => {
    try {
      const result = await createClientService(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.error("Error creating client:", error);
      res.status(500).json({ message: error.message });
    }
};

export const createMultipleClients = async (req, res) => {
  const { clients } = req.body;

  if (!clients || clients.length === 0) {
    return res.status(400).json({ message: "No clients provided." });
  }

  const results = [];
  const errors = [];

  for (const client of clients) {
    try {
      const result = await createClientService(client);
      results.push(result);
    } catch (error) {
      errors.push({
        client: client.name || "Unknown",
        message: error.message,
      });
    }
  }

  res.status(207).json({
    message: "Create Clients completed.",
    success: results,
    failed: errors,
  });
};

export const deleteClientById = async (req, res) => {
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

export const getClientById = async (req, res) => {
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

export const getClients = async (req, res) => {
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

export const updateClientById = async (req, res) => {
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