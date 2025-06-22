import * as taskRepository from '../repositories/task.repository.js';
import { validateTaskData } from '../validators/task.validator.js';

export const createTask = async (taskData) => {
  await validateTaskData(taskData);
  return await taskRepository.createTask(taskData);
};

export const getTasks = async (agentId, filters = {}) => {
  return await taskRepository.getTasksByAgent(agentId, filters);
};

export const getAllTasksAndActions = async(agent_id) => {
  return await taskRepository.getAllTasksAndActions(agent_id)
}

export const updateTask = async (taskId, agentId, updates) => {
  // Verify task exists and belongs to agent
  const task = await taskRepository.getTaskById(taskId);
  
  // if (!task) {
  //   throw new NotFoundError('Task not found');
  // }
  
  // if (task.agent_id !== agentId) {
  //   throw new ForbiddenError('Not authorized to update this task');
  // }
  
  await validateTaskData(updates, true);
  return await taskRepository.updateTask(taskId, updates);
};

export const deleteTask = async (taskId, agentId) => {
  const task = await taskRepository.getTaskById(taskId);
  
  // if (!task) {
  //   throw new NotFoundError('Task not found');
  // }
  
  // if (task.agent_id !== agentId) {
  //   throw new ForbiddenError('Not authorized to delete this task');
  // }
  
  return await taskRepository.deleteTask(taskId);
};