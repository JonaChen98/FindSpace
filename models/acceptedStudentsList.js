// const db = require("./db");
// const Sequelize = require("sequelize");
// const Student = require("./student");

// var acceptedStudentsList = db.sequelize.define("acceptedStudentsList", {
//   foreignKey: Sequelize.INTEGER
// });

// // acceptedStudentsList.hasMany(Student)

// module.exports = acceptedStudentsList;


module.exports = function(sequelize, DataTypes) {
  return sequelize.define("acceptedStudentsList", {
    foreignKey: DataTypes.INTEGER
  })
}