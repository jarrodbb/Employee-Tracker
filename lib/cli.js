//import inquirer
const express = require("express"); //import express
const inquirer = require("inquirer");
const { join } = require("path"); // be able to use the join method

// const mysql = require("mysql2");

// const db = mysql.createConnection(
//   {
//     host: "localhost",
//     // MySQL username,
//     user: "root",
//     // TODO: Add MySQL password here
//     password: "abcd1234",
//     database: "employee_db",
//   },
//   console.log(`Connected to the employee_db database.`)
// );

const getDepartment = () =>
  fetch("/api/department/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });

class CLI {
  //   run inquirer prompts
  run() {
    return (
      inquirer
        //prompts for creating logo
        .prompt([
          {
            type: "list",
            name: "question",
            message: "What would you like to do",
            choices: [
              "Add Employee",
              "Update Employee",
              "Update Employee Role",
              "View All Roles",
              "Add Role",
              "View All Deparements",
              "Add Department",
              "Quit",
            ],
          },
        ])
        .then(({ question }) => {
          if (question === "View All Departments") {
            getDepartment();
          }
        })
    );
  }
}

module.exports = CLI;
