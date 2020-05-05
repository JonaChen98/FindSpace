const Sequelize = require("sequelize");

var sequelize = null;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
  });
}
else {
  sequelize = new Sequelize("postgres://localhost/findspace");
}

global.db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  Student: sequelize.import(__dirname + "/student"),
  Professional: sequelize.import(__dirname + "/professional"),
  ReviewStudentsList: sequelize.import(__dirname + "/reviewStudentsList"),
  AcceptedStudentsList: sequelize.import(__dirname + "/acceptedStudentsList"),
  MatchedProfessionalList: sequelize.import(__dirname + "/matchedProfessionalsList"),
  PendingProfessionalsList: sequelize.import(__dirname + "/pendingProfessionalsList"),
  ProfessionalNotifications: sequelize.import(__dirname + "/professionalNotifications"),
  StudentNotifications: sequelize.import(__dirname + "/studentNotifications"),
};

module.exports = global.db;