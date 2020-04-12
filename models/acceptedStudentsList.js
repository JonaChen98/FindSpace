module.exports = function(sequelize, DataTypes) {
  return sequelize.define("AcceptedStudentsList", {
    foreignKey: DataTypes.INTEGER
  })
}