const db = require("./db");
const Sequelize = require("sequelize");
const Professionals = require("./professional");

var pendingProfessionalsList = db.sequelize.define("pendingProfessionalsList", {
  foriegnKey: Sequelize.INTEGER
});

// pendingProfessionalsList.hasMany(Professionals)

module.exports = pendingProfessionalsList;