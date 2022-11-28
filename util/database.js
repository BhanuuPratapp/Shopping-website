/*const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'Bhanu@123'
});

module.exports = pool.promise();
*/
const Sequelize = require('sequelize');

console.log(process.env.DB_PASSWORD)

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST
});

module.exports = sequelize;
