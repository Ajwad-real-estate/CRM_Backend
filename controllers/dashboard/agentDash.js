import { getPool } from "../../configs/dbConfig.js";

import { todayDate } from "../../utils/dashboardUtils.js";



//MARK: dashboard
const getAgentDashboard =  async (req, res) => {
	console.log('agent');
	const pool = await getPool();

	// const agentId = 'b23a934a-afd6-4427-8e5d-1cdf50d03eb2';
	const agentId = req.user.agentId;
	console.log(agentId);

	const today = todayDate;
	// console.log(today);

	try {
		// target
		const targetQuery = `select target from agent where id = $1;`;
		const targetResult = await pool.query(targetQuery, [agentId]);
		const target = parseInt(targetResult.rows[0].target, 10);
		// console.log(target);

		// today task
     
		const followUpQuery = `select count(*) from action where agent_id = $1 and type = 'Follow-Up';`;
		const followUpActions = await pool.query(followUpQuery, [agentId]);
		const followUpCount = parseInt(followUpActions.rows[0].count, 10);

		// console.log(followUpCount);

		const meetingQuery = `select count(*) from action where agent_id = $1 and type = 'Meeting';`;
		const meetingActions = await pool.query(meetingQuery, [agentId]);
		const meetingCount = parseInt(meetingActions.rows[0].count, 10);

		// // console.log(meetingCount);

		const followMeetQuery = `select count(*) from action where agent_id = $1 and type = 'Follow-Up After Meeting';`;
		const followMeetActions = await pool.query(followMeetQuery, [agentId]);
		const followMeetCount = parseInt(followMeetActions.rows[0].count, 10);

		console.log(followMeetCount);

		
		const emailQuery = `select count(*) from action where agent_id = $1 and type = 'Email';`;
		const emailActions = await pool.query(emailQuery, [agentId]);
		const emailCount = parseInt(emailActions.rows[0].count, 10);

		// console.log(emailCount);


		// new clients
    const newClientsQuery =` select count(*) from client where agent_id = $1 and status = 'new';`;
		const newClients = await pool.query(newClientsQuery, [agentId]);
		const newClientsCount = parseInt(newClients.rows[0].count, 10);

		// console.log(newClientsCount);

		// qualified clients
		const qualifiedClientsQuery =` select count(*) from client where agent_id = $1 and status = 'qualified';`;
		const qualifiedClients = await pool.query(qualifiedClientsQuery, [agentId]);
		const qualifiedClientsCount = parseInt(qualifiedClients.rows[0].count, 10);
		// console.log(qualifiedClientsCount);
	

		// reserved clients
		const reservedClientsQuery =` select count(*) from client where agent_id = $1 and status = 'reserved';`;
		const reservedClients = await pool.query(reservedClientsQuery, [agentId]);
		const reservedClientsCount = parseInt(reservedClients.rows[0].count, 10);

		// console.log(reservedClientsCount);


			// reserved clients
			const doneClientsQuery =` select count(*) from client where agent_id = $1 and status = 'done_deal';`;
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
	

export default getAgentDashboard;
