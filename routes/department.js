const department = require("express").Router(); //Import express router
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

department.get("/", (req, res) => {
  const sql = "SELECT id, department_name FROM department";
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

department.post("/", (req, res) => {
  const sql = "INSERT INTO department  (department_name) VALUES (?)";
  const departmentName = req.body.departmentName;
  if (!departmentName) {
    res
      .status(400)
      .json({ message: "error", error: "Department name is missing in body" });
    return;
  }
  db.query(sql, [departmentName], (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ message: "error", error: "something unexpected happened" });
      console.error(err);
      return;
    }
    res.json({
      message: "success",
      data: {
        departmentName,
      },
    });
  });
});

module.exports = department;
