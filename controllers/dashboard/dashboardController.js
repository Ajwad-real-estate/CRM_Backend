import router from '../../src/routes/dashboard.js';
import getAgentDashboard from './agentDash.js';
import getManagerDashboard from './managerDash.js';
import authorizeUser from '../../middlewares/authorizeUser.js';

router.middleware(authorizeUser)
const getDashboard = async (req, res) => {
	const user_role = req.user.roleId;
	// console.log(user_role);

	if (user_role === 'Sales Manager'){
		 return getManagerDashboard(req, res);

	}else {
		return getAgentDashboard(req, res);

	};


};


export default  getDashboard;
