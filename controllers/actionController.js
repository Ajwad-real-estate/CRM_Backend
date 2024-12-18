import { getPool } from "../configs/dbConfig.js";

import { todayDate } from "../utils/dashboardUtils.js";


const pool = await getPool();

//MARK: all Action
// checked
const getAllActions = async (req, res) => {
	const today = todayDate;
	const agent_id = req.user.agentId;
	// const pool = await getPool();

	try {
		const allActionQuery = await pool.query(`SELECT * FROM action where agent_id = $1;`, [agent_id]);
		const allActions = allActionQuery.rows;
		// console.log(allTasks);

		const todayActionsQuery = await pool.query(`SELECT * FROM action where agent_id = $1 and date = $2;`, [agent_id, today]);

		const todayActions = todayActionsQuery.rows;
		// console.log(todayTasks);
		
		const actions = {
			allActions : allActions,
			todayTasks : todayActions

		}

		return res.status(200).json(actions);

	} catch (err) {
		console.log(err.message);
		return res.status(500).json({message: err.message});
	};

};



//MARK: add Action
const addNewAction = async (req, res) => {
  const {
		agent_id = req.user.agentId,
    client_id = null,
    unit_id = null,
    project_id = null,
    type = null,
		completed = false,
		answered = false,
    client_status = null,
    location = null,
    comment = null,
		date,
		time = null
  } = req.body;

  try {
    // const pool = await getPool();

    const newActionQuery = `
      INSERT INTO task (agent_id, client_id, unit_id, project_id, type, completed, answered, client_status, location, comment, date, time)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`;

    const values = [
      agent_id,
      client_id,
      unit_id,
      project_id,
      type,
			completed,
			answered,
      client_status,
      location,
      comment,
			date,
			time
    ];

    const result = await pool.query(newActionQuery, values);

    return res.status(200).json({
      message: 'Action added successfully',
      task: result.rows[0],
    });
  } catch (err) {
    console.error('Error adding action:', err.message);
    return res.status(500).json({
      message: 'Failed to add action',
      error: err.message,
    });
  }
};



//MARK: get action
const getAction = async (req, res) => {
	// const agent_id = req.user.agentId;
	const actionId = req.params.id;
	try {
		const getActionQuery = await pool.query(`SELECT * FROM action where id = $1;`, [actionId]);
		console.log(getActionQuery);

		if (getActionQuery.rowCount === 0) {
			return res.status(404).json({message: 'no Actions found'});
		}


		const getAction = getActionQuery.rows[0];
		console.log(getAction);
		

		return res.status(200).json(getAction);

	} catch (err) {
		console.log(err.message);
		return res.status(500).json({message: err.message});
	};


};



// MARK: update action
const updateAction = async (req, res) => {
  const actionId = req.params.id;
  const action = req.body; // Expecting an object with fields to update

  try {
    // Validate Actionid
    if (!actionId) {s
      return res.status(400).json({ message: 'Invalid Action ID' });
    }

    // Check if Action object is empty
    if (!action || Object.keys(action).length === 0) {
      return res.status(400).json({ message: 'No fields provided to update' });
    }

    // Dynamically build SET clause
    const setClause = Object.keys(action)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

			console.log(setClause);

    const values = Object.values(action);
    values.push(actionId); // Add actionid as the last parameter

    const updateActionQuery = `
      UPDATE action
      SET ${setClause}
      WHERE id = $${values.length};
    `;
		console.log(updateActionQuery);

    // Execute the query
    const result = await pool.query(updateActionQuery, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Action not found' });
    }

    return res.status(200).json({ message: 'Action updated successfully' });
  } catch (err) {
    console.error('Error updating Action:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



export { getAllActions , addNewAction, getAction, updateAction }
