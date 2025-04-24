import { assignClientAgentService } from "../services/assignClientAgent.services";

const assignClientAgent = async (req, res) => {
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

export default assignClientAgent;