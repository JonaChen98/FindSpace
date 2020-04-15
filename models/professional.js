module.exports = function(sequelize, DataTypes) {
  var professional = sequelize.define("Professional", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    job: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  professional.associate = function(models) {
    models.professional.hasOne(models.AcceptedStudentsList);
    models.professional.hasOne(models.ReviewStudentsList);
  }
  
  return professional;
}