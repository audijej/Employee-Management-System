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
    console.log("connected as id " + connection.threadId + "\n");
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
                    viewAllEmployees();
                    break;
                case "View all employees by department":
                    console.log("all employees in the department");
                    viewAllEmployeesByDepartment();
                    break;
                case "View all employees by manager":
                    console.log("all employees via manager");
                    viewAllEmployeesByManager();
                    break;
                case "Add an employee":
                    console.log("addition of employee");
                    addEmployee();
                    break;
                case "Remove an employee":
                    console.log("remove the employee");
                    removeEmployee();
                    break;
                case "Update employee role":
                    console.log("update the role");
                    updateEmployeeRole();
                    break;
                case "Update employee manager":
                    console.log("update this employees manager");
                    updateEmployeeManager();
                    break;
                case "Remove employee role":
                    console.log("remove this employees role");
                    removeEmployeeRole();
                    break;
                case "View all roles":
                    console.log("roles");
                    viewAllRoles();
                    break;
            }
        })
}

function viewAllEmployees() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department ";
    query += "FROM department INNER JOIN role ON department.id = role.id ";
    query += "INNER JOIN employee ON role.id = employee.id";
    console.log(query)
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);

        decisions();
    });
};

function viewAllEmployeesByDepartment() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What department would you like to see?",
                name: "departmentView",
                choices: [
                    "Board of Directors",
                    "Human Resources",
                    "Engineering",
                    "Accounting",
                    "Legal",
                    "Sales",
                ]
            }
        ]).then(function (answer) {
            console.log(answer);
            var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department ";
            query += "FROM department INNER JOIN role ON department.id = role.id ";
            query += "INNER JOIN employee ON role.id = employee.id ";
            query += "WHERE department.department = '" + answer.departmentView + "';"
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.table(res);
                decisions();
            });
        });


};

function viewAllEmployeesByManager() {
    console.log("Hello Hello Hello World");
    console.table();
};

function addEmployee() {
    console.log("Hello Hello Hello Hello World");
    console.table();
};

function removeEmployee() {
    console.log("Hello Hello Hello Hello Hello World");
    console.table();
};

function updateEmployeeRole() {
    console.log("Hello Hello Hello Hello Hello Hello World");
    console.table();
};

function updateEmployeeManager() {
    console.log("Hello Hello Hello Hello Hello Hello World");
    console.table();
};

function removeEmployeeRole() {
    console.log("Hello Hello Hello Hello Hello Hello Hello World");
    console.table();
};

function viewAllRoles() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What role would you like to see?",
                name: "roleView",
                choices: [
                    "CEO",
                    "CFO",
                    "Software Engineer",
                    "HR Supervisor",
                    "Accountant",
                    "Lawer",
                ]
            }
        ]).then(function (answer) {
            console.log(answer);
            var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department ";
            query += "FROM department INNER JOIN role ON department.id = role.id ";
            query += "INNER JOIN employee ON role.id = employee.id ";
            query += "WHERE role.title = '" + answer.roleView + "';"
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.table(res);
                decisions();
            });
        });
    
}