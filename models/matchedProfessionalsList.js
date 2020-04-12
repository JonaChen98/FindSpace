module.exports = function(sequelize, DataTypes) {
  return sequelize.define("MatchedProfessionalsList", {
    foriegnKey: DataTypes.INTEGER
  })
}