module.exports = function(sequelize, DataTypes) {
  var reviewStudents = sequelize.define("ReviewStudentsList", {
    foreignKey: DataTypes.INTEGER,
    studentPKID: DataTypes.INTEGER,
    professionalPKID: DataTypes.INTEGER
  });
  
  reviewStudents.associate = function(models) {
    models.reviewStudents.hasMany(models.Student);
  };
  
  return reviewStudents;
  
  
  // return sequelize.define("ReviewStudentsList", {
  //   foreignKey: DataTypes.INTEGER,
  //   studentPKID: DataTypes.INTEGER,
  //   professionalPKID: DataTypes.INTEGER
  // })
}