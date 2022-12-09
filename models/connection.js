const Sequelize = require('sequelize');

const connection = new Sequelize('carshop', 'root', 'root', {
  host: 'localhost',
  dialect: 'mariadb',
});

module.exports = connection;