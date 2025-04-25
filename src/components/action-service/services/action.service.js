// services/actionService.js
import { dbQueries } from '../utils/quires.js';
import { todayDate } from '../../../components/dashboard-service/utils/dashboard.utils.js';

const actionService = {
  // Check if agent is authorized to work with a client
  async checkAgentAuthorization(agent_id, client_id) {
    if (!client_id) return true;
    return await dbQueries.checkAgentClientAuthorization(agent_id, client_id);
  },

  // Get all actions for an agent, including today's actions
  async getAllActionsForAgent(agent_id) {
    const today = todayDate;
    
    const allActions = await dbQueries.getAllActionsForAgent(agent_id);
    const todayActions = await dbQueries.getTodayActionsForAgent(agent_id, today);
    
    return {
      allActions,
      todayActions
    };
  },

  // Get action by ID
  async getActionById(actionId) {
    return await dbQueries.getActionById(actionId);
  },

  // Create a new action
  async createAction(actionData) {
    return await dbQueries.insertAction(actionData);
  },

  // Get all actions for a client
  async getClientActionsHistory(clientId) {
    return await dbQueries.getClientActions(clientId);
  },

  // Get incomplete actions for a client
  async getClientIncompleteActions(clientId) {
    return await dbQueries.getClientIncompleteActions(clientId);
  },

  // Update an action
  async updateAction(actionId, updateData) {
    return await dbQueries.updateAction(actionId, updateData);
  },

  // Create client agent unit record
  async createClientAgentUnit(unitData) {
    return await dbQueries.insertClientAgentUnit(unitData);
  },

  // Update client national ID
  async updateClientNatId(clientId, natId) {
    return await dbQueries.updateClientNatId(clientId, natId);
  }
};

export default actionService;