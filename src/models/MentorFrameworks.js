const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class MentorFrameworks extends Model {}

MentorFrameworks.init(
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
    frameworkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Frameworks,
        key: "id",
      },
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "mentorFrameworks",
  }
);

module.exports = MentorFrameworks;
