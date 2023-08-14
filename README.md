# Employee-Tracker

Track employees

## Description

Application allows the user to track employees by utilising a database using Mysql.

Within the database there is a Department, role and employee table. By using Primary and foreign keys the tables are linked. This allows the user to create, update and display information about departments, roles and employees.

By running the application, the user can specifically do the following

- Add Employee

- View all Employees

- Update Employee Role

- View All Roles

- Add Role

- View All Departments

- Add Department

- View employee by department

- Quit

## Table of Contents

- [Installation](#installation)

- [Usage](#usage)

- [license](#license)

## Installation

### Ensure a package.json file exists

If there is no package.json install one by running npm init

### Install

- console.table: ^0.10.0

- inquirer: ^8.2.4

- mysql2: ^2.2.5

### Running the application

Run the schema.sql - This ensure the database is being used and creates the required tables

Run the seeds.sql - This inputs data into the database to visually see the commands are working

run in the terminal npm start - this starts the application

[index.js]()

#### Database

[connection.js]()

[schema.sql]()

[seeds.sql]()

#### Packages

[package.json]()

## Usage

#### When Running the application, the user will be presented with a list of options. Use the arrow keys to select the option

#### Selecting "View all employees" displays a table and reruns inquirer

#### Selecting "View all Roles" displays a table and reruns inquirer

#### Selecting "View all Departments" displays a table and reruns inquirer

#### Selecting "Add Employee", the user will be prompted to add the new employee's first name, last name, role (select from a list), and their manager (select from a list)

#### Selecting "View all employees" displays a table with the new employee added

#### Selecting "Add Department", the user will be prompted to input the new department name. A message "department added" will be console logged

#### Selecting "View all Departments" displays a table with the new department added

#### Selecting "Add Role" the user will be prompted to input the name of the role, the salary, and the department it belongs to (select from list). A message "Role added" will be console logged

#### Selecting "View all Roles? displays a table with the new role added

#### Selecting "View employee by department" the user will be prompted to select the employee from a list. A table is then displayed with the employee and their department

## License

Please refer to the licence in the repo.
