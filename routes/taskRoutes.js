const express = require('express');
const { getAllTasks } = require('../controllers/taskController');

const router = express.Router();

// Route to fetch all tasks
router.get('/', getAllTasks);

module.exports = router;
