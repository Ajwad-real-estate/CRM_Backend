const { Sequelize } = require('sequelize');
const databaseConfig = require('../config/database');
const City = require('./City');
const Role = require('./Role');
const Agent = require('./Agent');
const Account = require('./Account');
const Task = require('./Task');
// Import other models...

// Set up Sequelize connection
const sequelize = new Sequelize(databaseConfig);

// Initialize models
City.init(sequelize);
Role.init(sequelize);
Agent.init(sequelize);
Account.init(sequelize);
Task.init(sequelize);
// Initialize other models...

// Set up relationships
Agent.associate({ Role, City });
Account.associate({ Agent });
Task.associate({ Agent, Client, Unit, Project });
// Define other associations...

module.exports = { sequelize, City, Role, Agent, Account, Task, /* Other models */ };
