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

[index.js](https://github.com/jarrodbb/Employee-Tracker/blob/main/index.js)

#### Database

[connection.js](https://github.com/jarrodbb/Employee-Tracker/blob/main/db/connection.js)

[schema.sql](https://github.com/jarrodbb/Employee-Tracker/blob/main/db/schema.sql)

[seeds.sql](https://github.com/jarrodbb/Employee-Tracker/blob/main/db/seeds.sql)

#### Packages

[package.json](https://github.com/jarrodbb/Employee-Tracker/blob/main/package.json)

#### Video Demo
[YouTube](https://youtu.be/l4JYYz--8Cs)

[google drive](https://drive.google.com/file/d/1b2EzQaLP-VxGsQZUOGXBAtqe30z3PAVk/view)

[Mp4](https://github.com/jarrodbb/Employee-Tracker/blob/main/assets/.DS_Store)

## Usage

#### When Running the application, the user will be presented with a list of options. Use the arrow keys to select the option
![Screenshot 2023-08-14 at 10 36 34 am](https://github.com/jarrodbb/Employee-Tracker/assets/132813348/19933201-3727-45ab-8015-34574adb0c20)

#### Selecting "View all employees" displays a table and reruns inquirer
![Screenshot 2023-08-14 at 10 36 55 am](https://github.com/jarrodbb/Employee-Tracker/assets/132813348/2c1d3d23-1787-4cd0-8400-aa379a50360b)

#### Selecting "View all Roles" displays a table and reruns inquirer
![Screenshot 2023-08-14 at 10 37 10 am](https://github.com/jarrodbb/Employee-Tracker/assets/132813348/92665e00-c25c-4a72-bd4c-aa98056e4190)

#### Selecting "View all Departments" displays a table and reruns inquirer
![Screenshot 2023-08-14 at 10 37 23 am](https://github.com/jarrodbb/Employee-Tracker/assets/132813348/ca063a32-6dec-4d13-b551-89b06c00c444)

#### Selecting "Add Employee", the user will be prompted to add the new employee's first name, last name, role (select from a list), and their manager (select from a list)
![Screenshot 2023-08-14 at 10 38 11 am](https://github.com/jarrodbb/Employee-Tracker/assets/132813348/4e088c58-330b-46b5-935a-bf033d271e95)

#### Selecting "View all employees" displays a table with the new employee added
![Screenshot 2023-08-14 at 10 38 27 am](https://github.com/jarrodbb/Employee-Tracker/assets/132813348/092ded2e-1722-4196-ab90-c0911d474c3b)

#### Selecting "Add Department", the user will be prompted to input the new department name. A message "department added" will be console logged
![Screenshot 2023-08-14 at 11 14 02 am](https://github.com/jarrodbb/Employee-Tracker/assets/132813348/0caa5deb-de48-4990-ad7c-e83113e73cba)

#### Selecting "View all Departments" displays a table with the new department added
![Screenshot 2023-08-14 at 10 39 05 am](https://github.com/jarrodbb/Employee-Tracker/assets/132813348/b3d726c5-0cf2-455a-9c2d-2601440cf4c6)

#### Selecting "Add Role" the user will be prompted to input the name of the role, the salary, and the department it belongs to (select from list). A message "Role added" will be console logged
![Screenshot 2023-08-14 at 11 15 11 am](https://github.com/jarrodbb/Employee-Tracker/assets/132813348/3c658040-4cb3-4a68-869e-e722b212f57c)

#### Selecting "View all Roles? displays a table with the new role added
![Screenshot 2023-08-14 at 10 39 05 am](https://github.com/jarrodbb/Employee-Tracker/assets/132813348/804bec55-cd47-440d-845d-2272fb0790ed)

#### Selecting "View employee by department" the user will be prompted to select the employee from a list. A table is then displayed with the employee and their department
![Screenshot 2023-08-14 at 11 16 46 am](https://github.com/jarrodbb/Employee-Tracker/assets/132813348/d21768e4-cf83-4c57-9710-b8a11fd4566a)

#### Selecting "Quit" the application stops 
![Screenshot 2023-08-14 at 10 40 36 am](https://github.com/jarrodbb/Employee-Tracker/assets/132813348/0d57739f-01a8-42a2-8f78-676958259c6a)

## License

Please refer to the licence in the repo.
