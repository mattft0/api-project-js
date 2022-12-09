const { Model, DataTypes } = require("sequelize");
const connection = require("./connection");

class Car extends Model {}

Car.init(
  {
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    color: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
  },
  {
    sequelize: connection,
  }
);

module.exports = Car;