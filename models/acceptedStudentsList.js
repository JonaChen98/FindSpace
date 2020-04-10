const db = require("./db");
const Sequelize = require("sequelize");
const Student = require("./student");

var acceptedStudentsList = db.define("acceptedStudentsList", {
  foreignKey: Sequelize.INTEGER
});

// acceptedStudentsList.hasMany(Student)

module.exports = acceptedStudentsList;