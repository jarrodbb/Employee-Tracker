//import inquirer
//const express = require("express"); //import express
const inquirer = require("inquirer");
const ui = new inquirer.ui.BottomBar();
const { join } = require("path"); // be able to use the join method

require("console.table");

const mysql = require("mysql2");
const department = require("../routes/department");

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

const viewAllRoles = () => {
  const sql = `
    SELECT 
        role.title AS Title,
        role.id AS ID,
        department.department_name AS Department,
        role.salary AS Salary

        FROM role
        JOIN department ON role.department_id = department.id;
    `;
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    // console.log(`

    // ${rows}

    // `);
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.table(rows);
  });
};

const allEmployees = () => {
  const sql = `
  SELECT
    employee.id AS ID,
    employee.first_name AS First_Name,
    employee.last_name AS Last_Name,
    role.title AS Job_Title,
    department.department_name AS Department

    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    console.table(rows);
  });
};

const getDepartment = () => {
  const sql = "SELECT * FROM department";
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    console.table(rows);
  });
};

const addDepartmentRequest = (department) => {
  const sql = "INSERT INTO department  (department_name) VALUES (?)";

  db.query(sql, [department], (err, result) => {
    if (err) {
      throw err;
    }
    console.log("department addded");
  });
};

const getRoles = () => {
  const sql = "SELECT * FROM role";
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    const roleList = rows.map((role) => {
      return {
        name: role.title,
      };
    });
    console.log(roleList);
  });
};

const getManagers = () => {
  const sql = "SELECT * FROM manger";
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    const managerList = rows.map((manager) => {
      return {
        name: manager.first_name,
        surname: manager.last_name,
      };
    });
  });
};

class CLI {
  //   run inquirer prompts
  run() {
    return inquirer

      .prompt([
        {
          type: "list",
          name: "question",
          message: "What would you like to do",
          choices: [
            "Add Employee",
            "View all Employees",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "View employee by manager",
            "View employee by department",
            "Quit",
          ],
        },
      ])
      .then(({ question }) => {
        if (question === "View All Departments") {
          return this.viewAllDepartments();
        }
        if (question === "Add Department") {
          return this.addDepartment();
        }
        if (question === "Add Employee") {
          return this.addEmployee();
        }
        if (question === "Add Role") {
          return this.addRole();
        }
        if (question === "View all Employees") {
          return this.viewEmployee();
        }
        if (question === "View All Roles") {
          return this.viewRoles();
        }
        if (question === "Update Employee Role") {
          return this.updateEmployeeRole();
        }
        if (question === "View employee by manager") {
          return this.viewEmployeesManager();
        }
        if (question === "View employee by department") {
          return this.viewEmployeesDepartment();
        }
        if (question === "Quit") {
          process.exit();
        }
      });
  }

  viewAllDepartments() {
    getDepartment();
  }

  viewRoles() {
    viewAllRoles();

    return this.run();
  }

  viewEmployee() {
    allEmployees();
  }

  addDepartment() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "department",
          message: "Please enter the department name",
        },
      ])
      .then(({ department }) => {
        addDepartmentRequest(department);
      });
  }

  viewEmployeesDepartment() {
    let departmentList = {};
    const newSql = "SELECT * FROM department";
    db.query(newSql, (err, rows) => {
      if (err) {
        throw err;
      }

      departmentList = rows.map((department) => {
        return {
          name: department.department_name,
          value: department.id,
        };
      });
    });
    const sql = "SELECT * FROM employee";
    db.query(sql, (err, rows) => {
      if (err) {
        throw err;
      }
      listOfEmployee = rows.map((employee) => {
        return {
          name: employee.first_name + " " + employee.last_name,
          value: employee.id,
        };
      });
      console.log(listOfEmployee);

      inquirer
        .prompt([
          {
            type: "list",
            name: "name",
            message: "Which employee do you want to check?",
            choices: listOfEmployee,
          },
        ])
        .then((answers) => {
          const employeeAndManager = `FROM role
            JOIN department ON ? = ?
            `;
          db.query(
            employeeAndManager,
            [answers.newRole, answers.name],
            (err, results) => {
              if (err) throw err;
              // console.log(results);
              console.log("Employee's role updated!");
            }
          );
        });
    });
  }

  viewEmployeesManager() {
    const sql = `
    SELECT
    employee.first_name AS First_Name,
    employee.last_name AS Last_Name,
    manager.first_name AS Manager_first_name,
    manager.last_name AS Manager_last_name

    FROM employee
    JOIN manager on employee.manager_id = manager.id
    `;

    db.query(sql, (err, rows) => {
      if (err) {
        throw err;
      }

      console.table(rows);
    });
  }

  updateEmployeeRole() {
    let listOfEmployee = {};
    const sql = "SELECT * FROM employee";
    db.query(sql, (err, rows) => {
      if (err) {
        throw err;
      }
      listOfEmployee = rows.map((employee) => {
        return {
          name: employee.first_name + " " + employee.last_name,
          value: employee.id,
        };
      });
      console.log(listOfEmployee);
    });

    const newSql = "SELECT * FROM role";
    db.query(newSql, (err, rows) => {
      if (err) {
        throw err;
      }

      const roleList = rows.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });
      console.log(roleList);

      inquirer
        .prompt([
          {
            type: "list",
            name: "name",
            message: "Which employee's role do you want to update?",
            choices: listOfEmployee,
          },
          {
            type: "list",
            name: "newRole",
            message: "Which role do you want to assign the selected employee?",
            choices: roleList,
          },
        ])
        .then((answers) => {
          console.log(answers.listOfEmployee);
          console.log(answers.roleList);
          const updateEmployeeRole =
            "UPDATE employee SET role_id = ? WHERE id = ?";
          db.query(
            updateEmployeeRole,
            [answers.newRole, answers.name],
            (err, results) => {
              if (err) throw err;
              // console.log(results);
              console.log("Employee's role updated!");
            }
          );
        });
    });
  }

  addEmployee() {
    let roleList = {};
    const sql = "SELECT * FROM role";
    db.query(sql, (err, rows) => {
      if (err) {
        throw err;
      }
      roleList = rows.map((roles) => {
        return {
          name: roles.title,
          value: roles.id,
        };
      });
      console.log(roleList);
    });

    const newSql = "SELECT * FROM manager";
    db.query(newSql, (err, rows) => {
      if (err) {
        throw err;
      }

      const managerList = rows.map((manager) => {
        return {
          name: manager.first_name + " " + manager.last_name,
          value: manager.id,
        };
      });

      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "what is their first name?",
          },
          {
            type: "input",
            name: "lastName",
            message: "What is their last name?",
          },
          {
            type: "list",
            name: "role",
            message: "what is thier role?",
            choices: roleList,
          },
          {
            type: "list",
            name: "manager",
            message: "who is their manager?",
            choices: managerList,
          },
        ])
        .then((answers) => {
          console.log(roleList.value);
          const addNewEmployee =
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
          db.query(
            addNewEmployee,
            [
              answers.firstName,
              answers.lastName,
              answers.role,
              answers.manager,
            ],
            (err, results) => {
              if (err) throw err;
              // console.log(results);
              console.log("Employee added!");
            }
          );
        });
    });
  }

  addRole() {
    const sql = "SELECT * FROM department";
    db.query(sql, (err, rows) => {
      if (err) {
        throw err;
      }
      console.log(rows);
      const departmentList = rows.map((department) => {
        return {
          name: department.department_name,
          value: department.id,
        };
      });
      console.log(departmentList);

      inquirer
        .prompt([
          {
            type: "input",
            name: "role",
            message: "what is the name of the role?",
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
          },
          {
            type: "list",
            name: "department",
            message: "which department does the role belong to",
            choices: departmentList,
          },
        ])
        .then((answers) => {
          console.log(answers.department);
          const addRole =
            "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
          db.query(
            addRole,
            [answers.role, answers.salary, answers.department],
            (err, results) => {
              if (err) throw err;
              // console.log(results);
              console.log("Role added!");
            }
          );
        });
    });
  }
}

module.exports = CLI;
