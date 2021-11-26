"use strict";
const { HttpErrorException } = require("../common/error");
module.exports = function (sequelize, DataTypes) {
    var refreshToken = sequelize.define(
        "refreshToken",
        {
            userId: {
                type: DataTypes.INTEGER, allowNull: false
            },
            token: { type: DataTypes.STRING, allowNull: false },
        },
        {
            underscored: true,
            classMethods: {
                associate: function (models) {
                    // associations can be defined here
                },
            },
            tableName: "refresh_token",
            timestamps: false,
        }
    );
    refreshToken.add = async function (userId, token) {
        try {
            let data = await refreshToken.create({ userId, token });
            return data.dataValues;
        } catch (e) {
            console.log(e);
            throw new HttpErrorException("DB_ERROR");
        }
    };

    refreshToken.search = async function (token) {
        try {
            let data = await refreshToken.findOne({ where: { token  },attributes:['token'] });
            return data;
        } catch (e) {
            throw new HttpErrorException("DB_ERROR");
        }
    };
    return refreshToken;
}
