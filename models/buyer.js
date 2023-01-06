const { Model, DataTypes } = require("sequelize");
const connection = require("./connection");
const bcrypt = require("bcryptjs");
class Buyer extends Model {}

Buyer.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
  },
  {
    sequelize: connection,
  }
);

module.exports = Buyer;