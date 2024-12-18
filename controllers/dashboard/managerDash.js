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

     
		const followUpQuery = `select count(*) from action where type = 'Follow-Up';`;
		const followUpActions = await pool.query(followUpQuery, [agentId]);
		const followUpCount = parseInt(followUpActions.rows[0].count, 10);

		// console.log(followUpCount);

		const meetingQuery = `select count(*) from action where type = 'Meeting';`;
		const meetingActions = await pool.query(meetingQuery, [agentId]);
		const meetingCount = parseInt(meetingActions.rows[0].count, 10);

		// console.log(meetingCount);

		const followMeetQuery = `select count(*) from action where and type = 'Follow-Up After Meeting';`;
		const followMeetActions = await pool.query(followMeetQuery, [agentId]);
		const followMeetCount = parseInt(followMeetActions.rows[0].count, 10);

		// console.log(followMeetCount);

		
		const emailQuery = `select count(*) from task where and type = 'Email';`;
		const emailActions = await pool.query(emailQuery, [agentId]);
		const emailCount = parseInt(emailActions.rows[0].count, 10);

		// console.log(emailCount);


		// new clients
    const newClientsQuery =` select count(*) from client where agent_id is null and status = 'new';`;
		const newClients = await pool.query(newClientsQuery, [agentId]);
		const newClientsCount = parseInt(newClients.rows[0].count, 10);

		// console.log(newClientsCount);


		// new assigend clients
				// new clients
				const newAssignedClientsQuery =` select count(*) from client where agent_id is null and status = 'new';`;
				const newAssignedClients = await pool.query(newAssignedClientsQuery, [agentId]);
				const newAssignedClientsCount = parseInt(newAssignedClients.rows[0].count, 10);

		// qualified clients
		const qualifiedClientsQuery =` select count(*) from client where status = 'qualified';`;
		const qualifiedClients = await pool.query(qualifiedClientsQuery, [agentId]);
		const qualifiedClientsCount = parseInt(qualifiedClients.rows[0].count, 10);
		// console.log(qualifiedClientsCount);
	

		// reserved clients
		const reservedClientsQuery =` select count(*) from client where status = 'reserved';`;
		const reservedClients = await pool.query(reservedClientsQuery, [agentId]);
		const reservedClientsCount = parseInt(reservedClients.rows[0].count, 10);

		// console.log(reservedClientsCount);


			// reserved clients
			const doneClientsQuery =` select count(*) from client where and status = 'done_deal';`;
			const doneClients = await pool.query(doneClientsQuery, [agentId]);
			const doneClientsCount = parseInt(doneClients.rows[0].count, 10);

			// console.log(doneClientsCount);



		const dashboardList = {
			target: target,
			followUpCount : followUpCount,
			meetingCount: meetingCount,
			followMeetCount : followMeetCount,
			emailCount: emailCount,
			newClientsCount : newClientsCount,
			newAssignedClientsCount: newAssignedClientsCount,
			qualifiedClientsCount : qualifiedClientsCount,
			reservedClientsCount: reservedClientsCount,
			doneClientsCount : doneClientsCount
		};

		console.log(dashboardList);

	
	return res.status(200).json(dashboardList);
	
	}catch (error){
		  console.log(error.message);
			return res.status(500).json({message: "couldn't fetch dashboard data"});
				
			};
	
	
	};
	

export default getManagerDashboard;
