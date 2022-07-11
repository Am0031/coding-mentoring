require("dotenv").config();

const { Sequelize } = require("sequelize");

const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;

const options = {
  host: DB_HOST,
  dialect: "mysql",
  port: DB_PORT,
  logging: false,
};

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, options);

module.exports = sequelize;
