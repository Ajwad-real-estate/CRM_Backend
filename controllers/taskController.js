import { getPool } from "../configs/dbConfig.js";

import { todayDate } from "../utils/dashboardUtils.js";


const pool = await getPool();

//MARK: all TASK
// checked
const getAllTasks = async (req, res) => {
  const today = todayDate;
  const agent_id = req.user.agentId;
  // const pool = await getPool();

  try {
    const allTaskQuery = await pool.query(`SELECT * FROM task where agent_id = $1;`, [agent_id]);
    const allTasks = allTaskQuery.rows;
    // console.log(allTasks);

    const todayTasksQuery = await pool.query(`SELECT * FROM task where agent_id = $1 and date = $2;`, [agent_id, today]);

    const todayTasks = todayTasksQuery.rows;
    // console.log(todayTasks);

    const tasks = {
      allTasks: allTasks,
      todayTasks: todayTasks

    }

    return res.status(200).json(tasks);

  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  };

};



//MARK: add TASK
const addNewTask = async (req, res) => {
  const {
    agent_id = req.user.agentId,
    title = null,
    detail = null,
    status = null,
    priority_level = null,
    date,
    time = null
  } = req.body;

  try {
    // const pool = await getPool();

    const newTaskQuery = `
      INSERT INTO task (agent_id, title, status, priority_level, detail, date, time)
      VALUES ($1, $2, $3, $4, $5, $6, $7);`;

    const values = [
      agent_id,
      title,
      status,
      priority_level,
      detail,
      date,
      time
    ];

    const result = await pool.query(newTaskQuery, values);

    return res.status(200).json({
      message: 'Task added successfully',
      task: result.rows[0],
    });
  } catch (err) {
    console.error('Error adding task:', err.message);
    return res.status(500).json({
      message: 'Failed to add task',
      error: err.message,
    });
  }
};



//MARK: get TASK
const getTask = async (req, res) => {
  // const agent_id = req.user.agentId;
  const taskId = req.params.id;
  try {
    const getTaskQuery = await pool.query(`SELECT * FROM task where id = $1;`, [taskId]);
    console.log(getTaskQuery);

    if (getTaskQuery.rowCount === 0) {
      return res.status(404).json({ message: 'no tasks found' });
    }


    const getTask = getTaskQuery.rows[0];
    console.log(getTask);


    return res.status(200).json(getTask);

  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  };


};



// MARK: update TASK
const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const task = req.body; // Expecting an object with fields to update

  try {
    // Validate taskId
    if (!taskId) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    // Check if task object is empty
    if (!task || Object.keys(task).length === 0) {
      return res.status(400).json({ message: 'No fields provided to update' });
    }

    // Dynamically build SET clause
    const setClause = Object.keys(task)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    console.log(setClause);

    const values = Object.values(task);
    values.push(taskId); // Add taskId as the last parameter

    const updateTaskQuery = `
      UPDATE task
      SET ${setClause}
      WHERE id = $${values.length};
    `;
    console.log(updateTaskQuery);

    // Execute the query
    const result = await pool.query(updateTaskQuery, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task updated successfully' });
  } catch (err) {
    console.error('Error updating task:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};




//MARK: delete TASK
const delTask = async (req, res) => {
  // const agent_id = req.user.agentId;
  const taskId = req.params.id;
  try {
    const getTaskQuery = await pool.query(`delete FROM task where id = $1;`, [taskId]);
    console.log(getTaskQuery);


    return res.status(200).json({ message: 'task deleted successfully' });

  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  };


};
export { getAllTasks, addNewTask, getTask, delTask, updateTask }
