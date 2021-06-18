const mysql = require("mysql");
const Promise = require("bluebird");

require("dotenv").config();

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

connection = Promise.promisifyAll(connection);
module.exports = connection;

//還是有點不懂這段
