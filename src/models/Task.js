const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");
const Framework = require("./Framework");
const Mentor = require("./Mentor");

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      // add foreign key to link mentor id to task
      // needs a relationship between mentor table and task table
    },
    taskName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    taskLevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    frameworkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Framework,
        key: "id",
      },
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Mentor,
        key: "id",
      },
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    resourceURL: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "task",
  }
);

module.exports = Task;
