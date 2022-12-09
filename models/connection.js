const Sequelize = require("sequelize");
const dbConfig = require("./db-config");

const connection = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  port: '3000'
});

connection.authenticate().then(() => console.log("Connected to DB"));

module.exports = connection;