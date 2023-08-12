const employee = require("express").Router(); //Import express router
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "abcd1234",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

employee.get("/", (req, res) => {
  const sql = `
  SELECT
    employee.id AS ID,
    employee.first_name AS First_Name,
    employee.last_name AS Last_Name,
    role.title AS Job_Title,
    department.department_name AS Department

    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id;`;

  db.query(sql, (err, rows) => {
    if (err) {
      res
        .status(500)
        .json({ message: "error", error: "something unexpected happened" });
      console.error(err);
      return;
    }

    res.json({
      message: "success",
      data: rows,
    });
  });
});

employee.post("/", (req, res) => {
    const sql = "INSERT INTO employee (first_name, last_name, role) VALUES (?)"
})

module.exports = employee;
