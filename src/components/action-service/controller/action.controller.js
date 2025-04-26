// controllers/actionController.js
import actionService from '../services/action.service.js';

export const getAllActions = async (req, res) => {
  const agent_id = req.user.agentId;
  
  try {
    const actions = await actionService.getAllActionsForAgent(agent_id);
    return res.status(200).json(actions);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const addNewAction = async (req, res) => {
  const {
    agent_id = req.user.agentId,
    client_id = null,
    unit_id = null,
    project_id = null,
    type_id,
    completed = false,
    answered = false,
    location = null,
    comment = null,
    date,
    time = null
  } = req.body;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'No fields provided to update' });
  }

  try {
    const isAuthorized = await actionService.checkAgentAuthorization(agent_id, client_id);
    if (!isAuthorized) {
      return res.status(400).json({ message: 'You are not assigned to this client. Ask for reassignment' });
    }

    const result = await actionService.createAction({
      agent_id,
      client_id,
      unit_id,
      project_id,
      type_id,
      completed,
      answered,
      location,
      comment,
      date,
      time
    });

    return res.status(200).json({
      message: 'Action added successfully',
      task: result,
    });
  } catch (err) {
    console.error('Error adding action:', err.message);
    return res.status(500).json({
      message: 'Failed to add action',
      error: err.message,
    });
  }
};

export const getAction = async (req, res) => {
  const actionId = req.params.id;
  
  try {
    const action = await actionService.getActionById(actionId);
    
    if (!action) {
      return res.status(404).json({ message: 'No Actions found' });
    }
    
    return res.status(200).json(action);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const getActionsHistoryOfClient = async (req, res) => {
  const clientId = req.params.id;

  try {
    const actions = await actionService.getClientActionsHistory(clientId);
    
    if (!actions.length) {
      return res.status(404).json({ message: 'No actions found for this client.' });
    }

    return res.status(200).json(actions);
  } catch (err) {
    console.error('Error fetching actions history:', err.message);
    return res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

export const getActionsNotcompletedOfClient = async (req, res) => {
  const clientId = req.params.id;

  try {
    const actions = await actionService.getClientIncompleteActions(clientId);
    
    if (!actions.length) {
      return res.status(404).json({ message: 'No actions found for this client.' });
    }

    return res.status(200).json(actions);
  } catch (err) {
    console.error('Error fetching actions history:', err.message);
    return res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

export const updateAction = async (req, res) => {
  const actionId = req.params.id;
  const agent_id = req.user.agentId;

  const {
    completed,
    answered,
    comment,
    status_id,
    unit_id = null,
    project_id = null,
    cancel_reason = null,
    client_nat_id = null,
    reservation_amount = null,
  } = req.body;

  try {
    // Validate request
    if (!actionId) {
      return res.status(400).json({ message: 'Invalid Action ID' });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'No fields provided to update' });
    }

    // Check if action exists and get client_id
    const actionData = await actionService.getActionById(actionId);
    if (!actionData) {
      return res.status(404).json({ message: 'Action not found' });
    }

    // Check if already completed
    if (actionData.completed) {
      return res.status(400).json({ message: 'This action is already completed and cannot be updated.' });
    }

    // Validate agent authorization
    const isAuthorized = await actionService.checkAgentAuthorization(agent_id, actionData.client_id);
    if (!isAuthorized) {
      return res.status(403).json({ message: 'You are not assigned to this client. Ask for reassignment.' });
    }

    // Update action
    await actionService.updateAction(actionId, {
      completed,
      answered,
      comment,
      status_id
    });

    // Handle related operations if status_id exists
    if (status_id) {
      await actionService.createClientAgentUnit({
        client_id: actionData.client_id,
        status_id,
        project_id,
        unit_id,
        cancel_reason,
        agent_id,
        reservation_amount
      });
    }

    // Update client if nat_id provided
    if (client_nat_id) {
      await actionService.updateClientNatId(actionData.client_id, client_nat_id);
    }

    return res.status(200).json({ message: 'Action updated successfully' });
  } catch (err) {
    console.error('Error updating action:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};