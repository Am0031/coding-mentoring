const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");
const Framework = require("./Framework");
const Mentee = require("./Mentee");

class MenteeFramework extends Model {}

MenteeFramework.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    mentee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Mentee,
        key: "id",
      },
    },
    framework_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Framework,
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
    modelName: "menteeFramework",
  }
);

module.exports = MenteeFramework;
