const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");
const Partnership = require("./Partnership");
const Task = require("./Task");

class AssignedTask extends Model {}

AssignedTask.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    partnershipId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Partnership,
        key: "id",
      },
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Task,
        key: "id",
      },
    },
    taskDeadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    taskComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "assignedTask",
  }
);

module.exports = AssignedTask;
