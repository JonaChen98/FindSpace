module.exports = function(sequelize, DataTypes) {
  var officeSpace = sequelize.define("OfficeSpace", {
    location: DataTypes.STRING,
    time: DataTypes.STRING,
    date: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    professionalName: DataTypes.STRING,
    professionalPKID: DataTypes.INTEGER
  });
  
  
  return officeSpace;
}