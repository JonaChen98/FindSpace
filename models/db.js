const Sequelize = require("sequelize");
// const db = new Sequelize("postgres://localhost/findspace");

// const sequelize = new Sequelize(
//   process.env.DATABASE,
//   process.env.DATABASE_USER,
//   process.env.DATABASE_PASSWORD,
//   {
//     dialect: 'postgres',
//   },
// );

if (process.env.DATABASE_URL) {
  var db = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true
    }
  })
}
else {
  var db = new Sequelize("postgres://localhost/findspace");
}

module.exports = db;