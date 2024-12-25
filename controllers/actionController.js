import { getPool } from "../configs/dbConfig.js";

import { todayDate } from "../utils/dashboardUtils.js";


const pool = await getPool();


const agent_id_check = async (agent_id, client_id) => {

	const check_agent = (await pool.query(`select agent_id from client where id = $1;`, [client_id])).rows[0].agent_id;

	// console.log(check_agent, agent_id);

	if (check_agent !== agent_id) {
		const check_agent_role = (await pool.query(`select role_id from agent where id = $1;`, [agent_id])).rows[0].role_id;
		if (check_agent_role == 2 || check_agent_role == 1) return true;
		return false;
	};

	return true;

};



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
			allActions: allActions,
			todayActions: todayActions

		}

		return res.status(200).json(actions);

	} catch (err) {
		console.log(err.message);
		return res.status(500).json({ message: err.message });
	};

};



//MARK: add Action
const addNewAction = async (req, res) => {
	const {
		agent_id = req.user.agentId,
		client_id = null,
		unit_id = null,
		project_id = null,
		type_id,
		completed = false,
		answered = false,
		status_id,
		location = null,
		comment = null,
		date,
		time = null
	} = req.body;


	if (!(req.body) || Object.keys(req.body).length === 0) {
		return res.status(400).json({ message: 'No fields provided to update' });
	}


	try {

		if (!(await agent_id_check(agent_id, client_id))) {
			return res.status(400).json({ message: 'you are not assigned to this client, Ask for reasignment' });

		}

		const newActionQuery = `
      INSERT INTO action (agent_id, client_id, unit_id, project_id, type_id, completed, answered, status_id, location, comment, date, time)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`;

		const values = [
			agent_id,
			client_id,
			unit_id,
			project_id,
			type_id,
			completed,
			answered,
			status_id,
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
			return res.status(404).json({ message: 'no Actions found' });
		}


		const getAction = getActionQuery.rows[0];
		console.log(getAction);


		return res.status(200).json(getAction);

	} catch (err) {
		console.log(err.message);
		return res.status(500).json({ message: err.message });
	};


};


// yousef
//MARK: act History 
const getActionsHistoryOfClient = async (req, res) => {
	const clientId = req.params.id;

	try {
		// Query to fetch actions for the given client ID
		const { rows, rowCount } = await pool.query(`SELECT * FROM action WHERE client_id = $1`, [clientId]);

		if (rowCount === 0) {
			return res.status(404).json({ message: 'No actions found for this client.' });
		}

		// Return the fetched actions
		return res.status(200).json(rows);
	} catch (err) {
		console.error('Error fetching actions history:', err.message);
		return res.status(500).json({ message: 'An internal server error occurred.' });
	}
};

// yousef
//MARK: act History 
const getActionsNotcompletedOfClient = async (req, res) => {
	const clientId = req.params.id;

	try {
		// Query to fetch actions for the given client ID
		const { rows, rowCount } = await pool.query(`SELECT * FROM action WHERE client_id = $1 AND completed IS false`, [clientId]);

		if (rowCount === 0) {
			return res.status(404).json({ message: 'No actions found for this client.' });
		}

		// Return the fetched actions
		return res.status(200).json(rows);
	} catch (err) {
		console.error('Error fetching actions history:', err.message);
		return res.status(500).json({ message: 'An internal server error occurred.' });
	}
};






// MARK: update action
const updateAction = async (req, res) => {
	const actionId = req.params.id;
	const agent_id = req.user.agentId;

	const {
		completed = false,
		answered = false,
		comment = null,
		status_id,
		unit_id = null,
		project_id = null,
		cancel_resaon = null,
		client_nat_id = null,
		reservation_amount = null,
	} = req.body;

	try {
		// Validate Actionid
		if (!actionId) {
			s
			return res.status(400).json({ message: 'Invalid Action ID' });
		};

		// Check if Action object is empty
		if (!(req.body) || Object.keys(req.body).length === 0) {
			return res.status(400).json({ message: 'No fields provided to update' });
		};

		const { client_id } = (await pool.query(`select client_id from action where id = $1;`, [actionId])).rows[0];


		if (!(await agent_id_check(agent_id, client_id))) {
			return res.status(400).json({ message: 'you are not assigned to this client, Ask for reasignment' });

		};


		// console.log(req.body);
		let updateActionQuery;
		let result;


		if (!status_id || status_id == 1) {
			updateActionQuery = ` UPDATE action
     		SET completed = $1, answered = $2, comment = $3, status_id = $4
     			 WHERE id = $5;`;
			result = await pool.query(updateActionQuery, [completed, answered, comment, status_id, actionId]);

			if (result.rowCount === 0) {
				return res.status(404).json({ message: 'Action not found' });
			}
			// console.log(result);
			return res.status(200).json({ message: 'Action updated successfully' });
		};



		updateActionQuery = ` insert into client_agent_unit
		(client_id, status_id, project_id, unit_id, cancel_reason, agent_id, reservation_amount)
		values ($1, $2, $3, $4, $5, $6, $7);`;


		result = await pool.query(updateActionQuery,
			[client_id, status_id, project_id, unit_id, cancel_resaon, agent_id, reservation_amount]);


		updateActionQuery = await pool.query('update client set nat_id = $1 where id = $2;', [client_nat_id, client_id]);


		return res.status(200).json({ message: 'Action updated successfully' });
	} catch (err) {
		console.error('Error updating Action:', err.message);
		return res.status(500).json({ message: 'Internal server error' });
	}
};


export { getAllActions, addNewAction, getAction, updateAction, getActionsHistoryOfClient, getActionsNotcompletedOfClient }
