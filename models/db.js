const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost/findspace");

// const sequelize = new Sequelize(
//   process.env.DATABASE,
//   process.env.DATABASE_USER,
//   process.env.DATABASE_PASSWORD,
//   {
//     dialect: 'postgres',
//   },
// );

module.exports = db;