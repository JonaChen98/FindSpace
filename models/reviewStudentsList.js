const db = require("./db");
const Sequelize = require("sequelize");
const Student = require("./student");

var reviewStudentsList = db.define("reviewStudentsList", {
  foreignKey: Sequelize.INTEGER
});

// reviewStudentsList.hasMany(Student);

module.exports = reviewStudentsList;