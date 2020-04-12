// const db = require("./db");
// const Sequelize = require("sequelize");
// const reviewStudentsList = require("./reviewStudentsList");
// const acceptedStudentsList = require("./acceptedStudentsList");

// var Professional = db.sequelize.define("professional", {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   company: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   job: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// })

// // Professional.hasOne(reviewStudentsList);
// // Professional.hasOne(acceptedStudentsList);

// module.exports = Professional;



module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Professional", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    job: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}