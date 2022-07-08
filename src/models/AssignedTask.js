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
    partnership_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Partnership,
        key: "id",
      },
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Task,
        key: "id",
      },
    },
    task_deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    task_complete: {
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
