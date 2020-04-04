const db = require("./db");
const Sequelize = require("sequelize");

const Professional = db.define("professional", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  company: {
    type: Sequelize.STRING,
    allowNull: false
  },
  job: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Professional;