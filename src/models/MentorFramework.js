const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");
const Framework = require("./Framework");
const Mentor = require("./Mentor");

class MentorFramework extends Model {}

MentorFramework.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    mentor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Mentor,
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
    modelName: "mentorFramework",
  }
);

module.exports = MentorFramework;
