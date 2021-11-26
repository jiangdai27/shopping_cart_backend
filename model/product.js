const { HttpErrorException } = require("../common/error");
"use strict";
module.exports = function (sequelize, DataTypes) {
  var Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      underscored: true,
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        },
      },
      tableName: "product",
      timestamps: false,
    }
  );

  Product.add = async function ({
    itemId,
    itemName,
    itemPrice,
    itemImage,
    itemDescription,
  }) {
    try {
      let data = await Product.create({
        id: itemId,
        name: itemName,
        price: itemPrice,
        image: itemImage,
        description: itemDescription,
      });
      return data.dataValues;
    } catch (e) {
      console.log(e);
    }
  };
  Product.list = async function (id) {
    try {
      let data = await Product.findAll(
        id
          ? {
              where: { id: id },
              raw: true,
            }
          : {}
      );
      return data;
    } catch (e) {
      console.log(e);
      throw new HttpErrorException("DB_ERROR");
    }
  };
  return Product;
};