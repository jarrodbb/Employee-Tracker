const mysql = require("mysql2");
//const bluebird = require("bluebird");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password here
    password: "abcd1234",
    database: "employee_db",
  },
 
);

module.exports = db;
