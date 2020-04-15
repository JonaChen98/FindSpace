module.exports = function(sequelize, DataTypes) {
  var student = sequelize.define("Student", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100
      },
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    school_email : {
      type: DataTypes.STRING,
      allowNull: false
    },
    major: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  student.associate = function(models) {
    models.student.hasOne(models.PendingProfessionalsList);
    models.student.hasOne(models.MatchedProfessionalsList);
  }
}