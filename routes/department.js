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
  
});

department.get("/:department", (req, res) => {
  const sql =
    "SELECT EXISTS(SELECT * FROM department where department_name = ?)";

  const department = req.params.department;

  if (!department) {
    res.status(400).json({
      message: "error",
      error: "department missing",
    });
    return;
  }

  db.query(sql, [department], (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ message: "error", error: "something bad happened" });
      console.error(err);
      return;
    }
    // console.log(result)
    res.json({
      exisit: Object.values(result[0]),
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
