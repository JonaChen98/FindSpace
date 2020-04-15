module.exports = function(sequelize, DataTypes) {
  var pendingProfessionals = sequelize.define("PendingProfessionalsList", {
    foreignKey: DataTypes.INTEGER,
    studentPKID: DataTypes.INTEGER,
    professionalPKID: DataTypes.INTEGER
  });
  
  pendingProfessionals.associate = function(models) {
    models.pendingProfessionals.hasMany(models.Professional);
  };
  
  return pendingProfessionals;
  
  // return sequelize.define("PendingProfessionalsList", {
  //   foriegnKey: DataTypes.INTEGER,
  //   studentPKID: DataTypes.INTEGER,
  //   professionalPKID: DataTypes.INTEGER
  // })
}