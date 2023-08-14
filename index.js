//Import inquirer
const inquirer = require("inquirer");
// Import connection
const db = require("./db/connection");

// Function to get all the departments from db
function getDepartment() {
  const sql = "SELECT * FROM department";

  db.query(sql, (err, results) => {
    if (err) throw err;
    console.table(results);
    run();
  });
}

//function to add department to db
function addDepartment() {
  //run second inquirer prompt
  inquirer
    .prompt([
      {
        type: "input",
        name: "dep",
        message: "Please enter the department name",
      },
    ])
    .then(({ dep }) => {
      const sql = `INSERT INTO department (department_name) VALUES (?)`;

      db.query(sql, [dep], (err, results) => {
        if (err) throw err;
        console.log("department addded");
        run();
      });
    });
}

// Function to view all roles in db
function viewRoles() {
  const sql = `
          SELECT 
              role.title AS Title,
              role.id AS ID,
              department.department_name AS Department,
              role.salary AS Salary
      
              FROM role
              JOIN department ON role.department_id = department.id;
          `;
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.table(results);
    run();
  });
}

// Function to add a role to db
function addRole() {
  // Get all departments to be used in inquirer prompt
  const sql = "SELECT * FROM department";
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }

    const departmentList = rows.map((department) => {
      return {
        name: department.department_name,
        value: department.id,
      };
    });

    inquirer
      //run second inquirer prompt
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
        const addRole =
          "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
        db.query(
          addRole,
          [answers.role, answers.salary, answers.department],
          (err, results) => {
            if (err) throw err;
            console.log("Role added!");
            run();
          }
        );
      });
  });
}

// Function to view all employees
function allEmployees() {
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
    run();
  });
}

// Function to add employee to db
function addEmployee() {
  let roleList = {};
  //Get all roles to be used in inquirer prompt
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
  });
  // get all employees  to be used in inquirer prompt
  const newSql = "SELECT * FROM employee";
  db.query(newSql, (err, rows) => {
    if (err) {
      throw err;
    }

    const employeeList = rows.map((employee) => {
      return {
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      };
    });

    inquirer
      //run second inquirer prompt
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
          choices: employeeList,
        },
      ])
      .then((answers) => {
        const addNewEmployee =
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
        db.query(
          addNewEmployee,
          [answers.firstName, answers.lastName, answers.role, answers.manager],
          (err, results) => {
            if (err) throw err;

            console.log("Employee added!");
            run();
          }
        );
      });
  });
}

// Function to update an employee's role in db
function updateEmployeeRole() {
  let listOfEmployee = {};
  // get all employees to be used in inquirer prompt
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
  });
  // get all roles to be used in inquirer prompt
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

    inquirer
      //run second inquirer prompt
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
        const updateEmployeeRole =
          "UPDATE employee SET role_id = ? WHERE id = ?";
        db.query(
          updateEmployeeRole,
          [answers.newRole, answers.name],
          (err, results) => {
            if (err) throw err;
            console.log("Employee's role updated!");
            run();
          }
        );
      });
  });
}

//Function to get employees and their departments from db
function getEmployeesAndDepartment() {
  //get all employees to be used in inquirer prompt
  const sql = "SELECT * FROM employee";
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    const listOfEmployee = rows.map((employee) => {
      return {
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      };
    });

    inquirer
      //run second inquirer prompt
      .prompt([
        {
          type: "list",
          name: "name",
          message: "Which employee do you want to check?",
          choices: listOfEmployee,
        },
      ])
      .then((answers) => {
        const employeeAndDepartment = `
          SELECT
          employee.first_name AS First_name,
          employee.last_name AS Last_name,
          department.department_name AS Department

          FROM employee
            JOIN role ON employee.role_id = role.id 
            Join department ON department.id = role.department_id
            where employee.id = ?
            `;
        db.query(employeeAndDepartment, [answers.name], (err, results) => {
          if (err) throw err;

          const employeeAndDepartment = results;
          console.table(employeeAndDepartment);
          run();
        });
      });
  });
}

// Run inquirer
function run() {
  inquirer
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
          "View employee by department",
          "Quit",
        ],
      },
    ])
    .then(({ question }) => {
      //if statements to check what the user has selected
      if (question === "View All Departments") {
        getDepartment();
      }
      if (question === "Add Department") {
        addDepartment();
      }
      if (question === "Add Employee") {
        addEmployee();
      }
      if (question === "Add Role") {
        addRole();
      }
      if (question === "View all Employees") {
        allEmployees();
      }
      if (question === "View All Roles") {
        viewRoles();
      }
      if (question === "Update Employee Role") {
        updateEmployeeRole();
      }

      if (question === "View employee by department") {
        getEmployeesAndDepartment();
      }
      if (question === "Quit") {
        process.exit();
      }
    });
}

//connect to db and run inquirer
db.connect((err) => {
  if (err) throw err;
  console.log(`Connected to the employee_db database.`);
  run();
});
