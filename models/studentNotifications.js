module.exports = function(sequelize, DataTypes) {
  var studentNotifications = sequelize.define("StudentNotifications", {
    studentPKID: DataTypes.INTEGER,
    professionalPKID: DataTypes.INTEGER,
    message: DataTypes.STRING
  });
  
  return studentNotifications;
}