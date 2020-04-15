module.exports = function(sequelize, DataTypes) {
  var matchedProfessionals = sequelize.define("MatchedProfessionalsList", {
    studentPKID: DataTypes.INTEGER,
    professionalPKID: DataTypes.INTEGER
  });
  
  matchedProfessionals.associate = function(models) {
    models.matchedProfessionals.hasMany(models.Professional);
  };
  
  return matchedProfessionals;
}