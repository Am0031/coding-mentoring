const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class MenteeFrameworks extends Model {}

MenteeFrameworks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    modelName: "menteeFrameworks",
  }
);

module.exports = MenteeFrameworks;
