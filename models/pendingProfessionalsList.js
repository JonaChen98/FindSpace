module.exports = function(sequelize, DataTypes) {
  return sequelize.define("PendingProfessionalsList", {
    foriegnKey: DataTypes.INTEGER
  })
}