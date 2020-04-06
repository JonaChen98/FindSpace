const db = require("./db");
const Sequelize = require("sequelize");
const Professionals = require("./professional");

var browseProfessionalsList = db.define("browseProfessionalsList", {
  foriegnKey: Sequelize.INTEGER
});

browseProfessionalsList.hasMany(Professionals);

module.exports = browseProfessionalsList;