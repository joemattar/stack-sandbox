require("dotenv").config();

const mysqldbparams = {
  HOST: process.env.RDS_HOSTNAME,
  USER: process.env.RDS_USERNAME,
  PASSWORD: process.env.RDS_PASSWORD,
  DB: process.env.RDS_DB_NAME,
  dialect: "mysql",
  pool: {
    // pool is optional, it will be used for Sequelize connection pool configuration
    max: 5, // maximum number of connections in pool
    min: 0, // minimum number of connections in pool
    acquire: 30000, // maximum time, in milliseconds, that a connection can be idle before being released
    idle: 10000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
  },
};
// Require sequelize that must already be installed with nmpm
// Note: mysql2 must already be installed. Does sequelize automatically requires mysql2 ???

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  mysqldbparams.DB,
  mysqldbparams.USER,
  mysqldbparams.PASSWORD,
  {
    host: mysqldbparams.HOST,
    dialect: mysqldbparams.dialect,
    operatorsAliases: false,

    pool: {
      max: mysqldbparams.pool.max,
      min: mysqldbparams.pool.min,
      acquire: mysqldbparams.pool.acquire,
      idle: mysqldbparams.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = db;
