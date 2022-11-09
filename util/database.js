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

const sequelize = new Sequelize('node-complete', 'root', 'Bhanu@123', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
