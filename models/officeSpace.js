module.exports = function(sequelize, DataTypes) {
  var officeSpace = sequelize.define("OfficeSpace", {
    spaceName: DataTypes.STRING,
    location: DataTypes.STRING,
    time: DataTypes.STRING,
    days: DataTypes.ARRAY(DataTypes.STRING),
    imageUrl: DataTypes.STRING,
    professionalName: DataTypes.STRING,
    professionalPKID: DataTypes.INTEGER
  });
  
  
  return officeSpace;
}