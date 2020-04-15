module.exports = function(sequelize, DataTypes) {
  var acceptedStudents = sequelize.define("AcceptedStudentsList", {
    foreignKey: DataTypes.INTEGER,
    studentPKID: DataTypes.INTEGER,
    professionalPKID: DataTypes.INTEGER
  });
  
  acceptedStudents.associate = function(models) {
    models.acceptedStudents.hasMany(models.Student);
  };
  
  return acceptedStudents;
  
  // return sequelize.define("AcceptedStudentsList", {
  //   foreignKey: DataTypes.INTEGER,
  //   studentPKID: DataTypes.INTEGER,
  //   professionalPKID: DataTypes.INTEGER
  // })
}