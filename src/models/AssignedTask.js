const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");
const Framework = require("./Framework");
const Mentee = require("./Mentee");
const Mentor = require("./Mentor");
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
    mentorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Mentor,
        key: "id",
      },
    },
    menteeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Mentee,
        key: "id",
      },
    },
    frameworkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Framework,
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
    taskStatus: {
      type: DataTypes.STRING,
      defaultValue: "Not Started",
    },
    taskPoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Task,
        key: "points",
      },
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
