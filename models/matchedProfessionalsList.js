module.exports = function(sequelize, DataTypes) {
  var matchedProfessionals = sequelize.define("MatchedProfessionalsList", {
    foreignKey: DataTypes.INTEGER,
    studentPKID: DataTypes.INTEGER,
    professionalPKID: DataTypes.INTEGER
  });
  
  matchedProfessionals.associate = function(models) {
    models.matchedProfessionals.hasMany(models.Professional);
  };
  
  return matchedProfessionals;
  
  
  // return sequelize.define("MatchedProfessionalsList", {
  //   foriegnKey: DataTypes.INTEGER,
  //   studentPKID: DataTypes.INTEGER,
  //   professionalPKID: DataTypes.INTEGER
  // })
}