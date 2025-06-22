import * as taskService from "../services/task.service.js";

export const createTask = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      agent_id: req.user.agentId, // Set from authenticated user
    };

    const task = await taskService.createTask(taskData);
    res.status(201).json(task);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

//MARK: all TASK
// checked
export const getAllTasks = async (req, res) => {
  const agent_id = req.user.agentId;

  try {
    const allTaskQuery = await pool.query(
      `SELECT * FROM task where agent_id = $1 and status_id not in (3,4,5);`,
      [agent_id]
    );

    const allTasks = allTaskQuery.rows;

    const allActionQuery = await pool.query(
      `SELECT * FROM action where agent_id = $1 and  not completed;`,
      [agent_id]
    );

    const allActions = allActionQuery.rows;

    const tasks = {
      allTasks: allTasks,
      allActions: allActions,
    };

    return res.status(200).json(tasks);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
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
