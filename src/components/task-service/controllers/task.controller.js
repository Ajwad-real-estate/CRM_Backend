import * as taskService from '../services/task.service.js';

export const createTask = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      agent_id: req.user.agentId // Set from authenticated user
    };
    
    const task = await taskService.createTask(taskData);
    res.status(201).json(task);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const agentId = req.user.agentId;
    const { status, priority } = req.query;
    
    const tasks = await taskService.getTasks(agentId, { status, priority });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updates = req.body;
    const agentId = req.user.agentId;
    
    const updatedTask = await taskService.updateTask(taskId, agentId, updates);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const agentId = req.user.agentId;
    
    await taskService.deleteTask(taskId, agentId);
    res.status(204).end();
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};