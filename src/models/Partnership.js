const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");
const Mentee = require("./Mentee");
const Mentor = require("./Mentor");

class Partnership extends Model {}

Partnership.init(
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
    projectName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "partnership",
  }
);

module.exports = Partnership;
