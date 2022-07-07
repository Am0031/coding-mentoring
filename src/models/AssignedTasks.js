const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class AssignedTasks extends Model {}

AssignedTasks.init(
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
        model: Frameworks,
        key: "id",
      },
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tasks,
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
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "assignedTasks",
  }
);

module.exports = AssignedTasks;
