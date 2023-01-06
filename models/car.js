const { Model, DataTypes } = require("sequelize");
const connection = require("./connection");
const bcrypt = require("bcryptjs");
class Car extends Model {}

Car.init(
  {
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    color: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    sequelize: connection,
  }
);

module.exports = Car;