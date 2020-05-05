module.exports = function(sequelize, DataTypes) {
  var professionalNotifications = sequelize.define("ProfessionalNotifications", {
    studentPKID: DataTypes.INTEGER,
    professionalPKID: DataTypes.INTEGER,
    message: DataTypes.STRING
  });
  
  return professionalNotifications;
}