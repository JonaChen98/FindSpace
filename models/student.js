// const db = require("./db");
// const Sequelize = require("sequelize");
// const pendingProfessionalsList = require("./pendingProfessionalsList");
// const matchedProfessionalsList = require("./matchedProfessionalsList");

// var Student = db.sequelize.define("student", {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   age: {
//     type: Sequelize.INTEGER,
//     validate: {
//       min: 0,
//       max: 100
//     },
//     allowNull: false
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   school_email : {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   major: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

// // Student.hasOne(browseProfessionalsList);
// // Student.hasOne(pendingProfessionalsList);
// // Student.hasOne(matchedProfessionalsList);

// module.exports = Student;



module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Student", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100
      },
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    school_email : {
      type: DataTypes.STRING,
      allowNull: false
    },
    major: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}