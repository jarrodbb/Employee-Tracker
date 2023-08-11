const express = require("express"); //import express
// const mysql = require("mysql2");
const path = require("path"); //import path

const api = require("./routes/index"); //import routes

const PORT = process.env.PORT || 3001; //added process.env.PORT for using Heroku

const app = express(); //use express

app.use(express.json());

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

app.use("/api", api); // Modular API routes

app.use((req, res) => {
  res.status(404).end();
});

// module.exports = app;

//imports CLI
const CLI = require("./lib/cli");

//instantiate a new CLI
new CLI().run();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
