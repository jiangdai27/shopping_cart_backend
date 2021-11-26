"use strict";
const md5 = require("md5");
module.exports = function (sequelize, DataTypes) {
  var UserProfile = sequelize.define(
    "UserProfile",
    {
      name: DataTypes.STRING,
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      created_at: DataTypes.DATEONLY,
    },
    {
      underscored: true,
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        },
      },
      tableName: "user_profile",
      timestamps: false,
    }
  );

  UserProfile.add = async function (name, email, password) {
    let hash_pass = md5(password);
    try {
      let data = await UserProfile.create({ name, email, password: hash_pass });
      return data.dataValues;
    } catch (e) {
      console.log(e);
      throw new HttpErrorException("DB_ERROR");
    }
  };
  UserProfile.userinfo = async function (email, password) {
    let hash_pass = md5(password);
    try {
      let result = UserProfile.findOne({
        where: { email, password: hash_pass },
        attributes: ["name", "id"],
        raw: true,
      });
      return result;
    } catch (e) {
      console.log(e);
      throw new HttpErrorException("DB_ERROR");
    }
  };
  return UserProfile;
};
