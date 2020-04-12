const Sequelize = require("sequelize");
// const db = new Sequelize("postgres://localhost/findspace");


// if (process.env.DATABASE_URL) {
//   var db = new Sequelize(process.env.DATABASE_URL, {
//     dialect:  'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//       ssl: true
//     }
//   })
// }
// else {
//   var db = new Sequelize("postgres://localhost/findspace");
// }

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
  ReviewStudentsList: sequelize.import(__dirname + "/reviewStudentsList")
  // add your other models here
};

module.exports = global.db;

// module.exports = db;