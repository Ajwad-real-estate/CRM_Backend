import { getPool } from "../../configs/dbConfig.js";

import { todayDate } from "../../utils/dashboardUtils.js";



//MARK: dashboard
const getManagerDashboard = async (req, res) => {
	console.log('manager');

	const pool = await getPool();
	const agentId = req.user.agentId;

	const today = todayDate;
	// console.log(today);

	try {
		// target
		const targetQuery = `select target from agent where id = $1;`;
		const targetResult = await pool.query(targetQuery, [agentId]);
		const target = parseInt(targetResult.rows[0].target, 10);
		// console.log(target);


		const followUpQuery = `select count(*) from action where type_id = 1;`;
		const followUpActions = await pool.query(followUpQuery);
		const followUpCount = parseInt(followUpActions.rows[0].count, 10);

		// console.log(followUpCount);

		const meetingQuery = `select count(*) from action where type_id = 2;`;
		const meetingActions = await pool.query(meetingQuery);
		const meetingCount = parseInt(meetingActions.rows[0].count, 10);

		// console.log(meetingCount);

		const followMeetQuery = `select count(*) from action where type_id = 3;`;
		const followMeetActions = await pool.query(followMeetQuery);
		const followMeetCount = parseInt(followMeetActions.rows[0].count, 10);

		// console.log(followMeetCount);


		const emailQuery = `select count(*) from action where type_id = 4;`;
		const emailActions = await pool.query(emailQuery);
		const emailCount = parseInt(emailActions.rows[0].count, 10);

		// console.log(emailCount);


		// new clients
		const newClientsQuery = ` select count(*) from client where agent_id is null and status_id = 1;`;
		const newClients = await pool.query(newClientsQuery);
		const newClientsCount = parseInt(newClients.rows[0].count, 10);

		// console.log(newClientsCount);


		// new assigend clients
		// new clients
		const newAssignedClientsQuery = ` select count(*) from client where agent_id is not null and status_id = 1;`;
		const newAssignedClients = await pool.query(newAssignedClientsQuery);
		const newAssignedClientsCount = parseInt(newAssignedClients.rows[0].count, 10);

		// qualified clients
		const qualifiedClientsQuery = ` select count(*) from client where status_id = 2;`;
		const qualifiedClients = await pool.query(qualifiedClientsQuery);
		const qualifiedClientsCount = parseInt(qualifiedClients.rows[0].count, 10);
		// console.log(qualifiedClientsCount);


		// reserved clients
		const reservedClientsQuery = ` select count(*) from client where status_id = 3;`;
		const reservedClients = await pool.query(reservedClientsQuery);
		const reservedClientsCount = parseInt(reservedClients.rows[0].count, 10);

		// console.log(reservedClientsCount);


		// reserved clients
		const doneClientsQuery = ` select count(*) from client where status_id = 4;`;
		const doneClients = await pool.query(doneClientsQuery);
		const doneClientsCount = parseInt(doneClients.rows[0].count, 10);

		// console.log(doneClientsCount);



		const dashboardList = {
			target: target,
			followUpCount: followUpCount,
			meetingCount: meetingCount,
			followMeetCount: followMeetCount,
			emailCount: emailCount,
			newClientsCount: newClientsCount,
			newAssignedClientsCount: newAssignedClientsCount,
			qualifiedClientsCount: qualifiedClientsCount,
			reservedClientsCount: reservedClientsCount,
			doneClientsCount: doneClientsCount
		};

		console.log(dashboardList);


		return res.status(200).json(dashboardList);

	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ message: "couldn't fetch dashboard data" });

	};


};


export default getManagerDashboard;
