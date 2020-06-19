var mysql = require("mysql");
var inquirer = require("inquirer");
var password = require("dotenv").config()

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 5000
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.DB_PASSWORD,
    database: "employees_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Successfully connected");
    decisions();
});

function decisions() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "decision",
                choices: [
                    "View all employees",
                    "View all employees by department",
                    "View all employees by manager",
                    "Add an employee",
                    "Remove an employee",
                    "Update employee role",
                    "Update employee manager",
                    "Remove employee role",
                    "View all roles"
                ]
            }
        ]).then(function (data) {
            console.log("Success!")
            switch (data.decision) {
                case "View all employees":
                    console.log("all employees");
                    break;
                case "View all employees by department":
                    console.log("all employees in the department");
                    break;
                case "View all employees by manager":
                    console.log("all employees via manager");
                    break;
                case "Add an employee":
                    console.log("addition of employee");
                    break;
                case "Remove an employee":
                    console.log("remove the employee");
                    break;
                case "Update employee role":
                    console.log("update the role");
                    break;
                case "Update employee manager":
                    console.log("update this employees manager");
                    break;
                case "Remove employee role":
                    console.log("remove this employees role");
                    break;
                case "View all roles":
                    console.log("roles");
                    break;
            }
        })
}