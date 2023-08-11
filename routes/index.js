const express = require("express"); // Import express

const departmentRouter = require("./department"); // Import department
const employeeRouter = require("./employee"); // Import employee
const rolesRouter = require("./roles"); // Import roles

const app = express();

app.use("/department", departmentRouter); // build routes to use departmentRouter
app.use("/employee", employeeRouter); // build routes to use employeeRouter
app.use("/roles", rolesRouter); // build routes to use rolesRouter

module.exports = app; //export
