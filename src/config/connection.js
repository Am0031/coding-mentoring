require("dotenv").config();

const { Sequelize } = require("sequelize");

const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const options = {};

const sequelize = new Sequelize();

module.exports = sequelize;
