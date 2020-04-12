const db = require("./db");
const Sequelize = require("sequelize");
const Professionals = require("./professional");

var matchedProfessionalsList = db.sequelize.define("matchedProfessionalsList", {
  foreignKey: Sequelize.INTEGER
});

// matchedProfessionalsList.hasMany(Professionals);

module.exports = matchedProfessionalsList;