module.exports = function(sequelize, DataTypes) {
  return sequelize.define("ReviewStudentsList", {
    foreignKey: DataTypes.INTEGER
  })
}