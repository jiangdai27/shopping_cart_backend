const { HttpErrorException } = require("../common/error");
"use strict";
module.exports = function (sequelize, DataTypes) {
  var purchaseInfo = sequelize.define(
    "purchaseInfo",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      purchaseId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      item: { type: DataTypes.JSON },
      created_at: DataTypes.DATEONLY,
    },
    {
      underscored: true,
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        },
      },
      tableName: "purchase_info",
      timestamps: false,
    }
  );

  purchaseInfo.update = async function (userId, purchaseId, item) {
    try {
      let data = purchaseInfo.upsert({ userId, purchaseId, item });
      return data;
    } catch (e) {
      console.log(e);
      throw new HttpErrorException("DB_ERROR");
    }
  };

  purchaseInfo.postCart = async function (userId, purchaseId, item) {
    try {
      let cartData = await purchaseInfo.getCart(userId);
      console.log("aa", item);
      let productId = item.productId;
      let productquantity = item.productNumber;
      console.log("cccc",productquantity);
      let index = Object.keys(cartData.item).findIndex(x => x == productId)
      if (index >= 0) {
        cartData.item[index] += productquantity;
      } else {
        cartData.item[productId] = productquantity;
      }

      //let newItem = { ...cartData.item, ...item };
      await purchaseInfo.update(userId, purchaseId, cartData.item);
    } catch (e) {
      console.log(e);
      throw new HttpErrorException("DB_ERROR");
    }
  };

  purchaseInfo.getCart = async function (userid) {
    try {
      let result = await purchaseInfo.findOne({
        where: { user_id: userid },
        attributes: ["user_id", "purchase_id", "item"],
        raw: true,
      });
      return result;
    } catch (e) {
      console.log(e);
      throw new HttpErrorException("DB_ERROR");
    }
  };
  return purchaseInfo;
};