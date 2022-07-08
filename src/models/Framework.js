const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Framework extends Model {}

Framework.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    frameworkName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "framework",
  }
);

module.exports = Framework;
