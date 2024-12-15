const { DataTypes } = require('sequelize');

class Task {
  static init(sequelize) {
    return sequelize.define('Task', {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      // other fields...
    }, { timestamps: false });
  }

  static associate(models) {
    this.belongsTo(models.Agent, { foreignKey: 'agent_id' });
    this.belongsTo(models.Client, { foreignKey: 'client_id' });
    this.belongsTo(models.Unit, { foreignKey: 'unit_id' });
    this.belongsTo(models.Project, { foreignKey: 'project_id' });
  }
}

module.exports = Task;
