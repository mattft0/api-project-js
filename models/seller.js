const { Model, DataTypes } = require("sequelize");
const connection = require("./connection");
const bcrypt = require("bcryptjs");
class Seller extends Model { }

Seller.init(
    {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        shop_address: DataTypes.STRING,
        shop_name: DataTypes.STRING,
    },
    {
        sequelize: connection,
    }
);

module.exports = Seller;