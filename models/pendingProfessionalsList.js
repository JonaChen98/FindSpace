module.exports = function(sequelize, DataTypes) {
  var pendingProfessionals = sequelize.define("PendingProfessionalsList", {
    studentPKID: DataTypes.INTEGER,
    professionalPKID: DataTypes.INTEGER
  });
  
  pendingProfessionals.associate = function(models) {
    models.pendingProfessionals.hasMany(models.Professional);
  };
  
  return pendingProfessionals;
}