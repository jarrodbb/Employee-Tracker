//import mysql
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  // MySQL username,
  user: "root",
  // MySQL password here
  password: "abcd1234",
  database: "employee_db",
});

//export db
module.exports = db;
