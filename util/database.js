const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-tutorial", "root", "Iamdprats207", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
