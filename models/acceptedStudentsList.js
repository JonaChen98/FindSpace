module.exports = function(sequelize, DataTypes) {
  var acceptedStudents = sequelize.define("AcceptedStudentsList", {
    studentPKID: DataTypes.INTEGER,
    professionalPKID: DataTypes.INTEGER
  });
  
  acceptedStudents.associate = function(models) {
    models.acceptedStudents.hasMany(models.Student);
  };
  
  return acceptedStudents;
}