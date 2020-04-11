const db = require("./db");
const Student = require("./student");
const Professional = require("./professional");
const reviewStudentsList = require("./reviewStudentsList");

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
  });
}
else {
  const db = new Sequelize("postgres://localhost/findspace");
}

global.models = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  User: sequelize.import(__dirname + "/user"),
  // add your other models here
};

module.exports = {
  db,
  Student,
  Professional,
  reviewStudentsList
}