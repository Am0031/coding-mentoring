const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Frameworks extends Model {}

Frameworks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    framework: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "frameworks",
  }
);

module.exports = Frameworks;
