const roles = require("express").Router(); //Import express router
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

roles.post("/", (req, res) => {
  const sql =
    "SELECT EXISTS(SELECT * FROM department where department_name = ?)";
  const checkDepartmentId = "SELECT id FROM department WHERE id = ?";
  const addRole =
    "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";

  const newRole = {
    title: req.body.roleTitle,
    salary: req.body.roleSalary,
    department: req.body.roleDepartment,
  };

  console.log(newRole);

  // don't know why not breaking if no body
  if (!newRole) {
    res.status(400).json({
      message: "error",
      error: "Role title, salary or department missing",
    });
    return;
  }
  

  db.query(sql, [newRole.department], (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ message: "error", error: "something bad happened" });
      console.error(err);
      return;
    }
    console.log(result);
    if (result) {
      db.query(checkDepartmentId, [newRole.department], (err, row) => {
        newRole.department = row.id;
        db.query(
          addRole,
          [newRole.title, newRole.salary, row.id],
          (err, result) => {
            if (err) {
              res.status(500).json({
                message: "error",
                error: "something unexpected happened",
              });
              console.error(err);
              return;
            }
            console.log(row.id);
            res.json({
              message: "success",
              data: {
                Role: newRole.title,
                Salary: newRole.salary,
                Deparment: row.id,
              },
            });
          }
        );
      });
    }
    // res.json({
    //   message: "success",
    //   data: {
    //     newRole,
    //   },
    // });
  });
});

module.exports = roles;
