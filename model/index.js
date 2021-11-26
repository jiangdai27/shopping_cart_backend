'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var config = require('../config.json');
var db = {};

var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password,{
    host:config.db.host,
    dialect:'postgres'
});

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    });
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;