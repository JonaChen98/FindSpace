const db = require("./db");
const Sequelize = require("sequelize");
const browseProfessionalsList = require("./browseProfessionalsList");
const pendingProfessionalsList = require("./pendingProfessionalsList");
const matchedProfessionalsList = require("./matchedProfessionalsList");

var Student = db.define("student", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 100
    },
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  school_email : {
    type: Sequelize.STRING,
    allowNull: false
  },
  major: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Student.hasOne(browseProfessionalsList);
Student.hasOne(pendingProfessionalsList);
Student.hasOne(matchedProfessionalsList);

module.exports = Student;