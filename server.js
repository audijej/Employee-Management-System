var mysql = require("mysql");
var inquirer = require("inquirer");
var password = require("dotenv").config()

let profile = [];
let employeeNameArray = [];
let employeeRoleArray = [];
let deleteEmployeeArray = [];
let roleArray = [];
let departmentArray = [];

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
                    "View all roles",
                    "View all employees by department",
                    "View all employees by manager",
                    "Add an employee",
                    "Add a department",
                    "Add a role",
                    "Remove an employee",
                    "Update employee role",
                    "Update employee manager",
                    "Remove employee role"
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
                case "Add a role":
                    console.log("addition of role");
                    addRole();
                    break;
                case "Add a department":
                    console.log("addition of department");
                    addDepartment();
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
    query += "FROM department INNER JOIN role ON department.id = role.department_id ";
    query += "INNER JOIN employee ON role.id = employee.role_id";
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
                    {
                        name: "Board of Directors",
                        value: 1,
                    },

                    {
                        name: "Legal",
                        value: 2,
                    },

                    {
                        name: "Human Resources",
                        value: 3,
                    },

                    {
                        name: "Engineering",
                        value: 4,
                    },

                    {
                        name: "Accounting",
                        value: 5,
                    },

                    {
                        name: "Sales",
                        value: 6,
                    },

                    {
                        name: "Management",
                        value: 7,
                    },
                ]
            }
        ]).then(function (answer) {
            console.log(answer);
            var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department ";
            query += "FROM department INNER JOIN role ON department.id = role.department_id ";
            query += "INNER JOIN employee ON role.id = employee.role_id ";
            query += "WHERE department.id = '" + answer.departmentView + "';"
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
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your employees ID number?",
                name: "employeeId"
            },

            {
                type: "input",
                message: "What is your employees first name?",
                name: "first_name"
            },

            {
                type: "input",
                message: "What is your employees last name?",
                name: "last_name"
            },

            {
                type: "list",
                message: "What is your employees title?",
                name: "title",
                choices: [
                    {
                        name: "CEO",
                        value: 1,
                    },

                    {
                        name: "CFO",
                        value: 2,
                    },

                    {
                        name: "Lawyer",
                        value: 3,
                    },

                    {
                        name: "Software Engineer",
                        value: 4,
                    },

                    {
                        name: "HR Specialist",
                        value: 5,
                    },

                    {
                        name: "HR Supervisor",
                        value: 6,
                    },

                    {
                        name: "Accountant",
                        value: 7,
                    },

                    {
                        name: "Accountant Secretary",
                        value: 8,
                    },

                    {
                        name: "Sale Rep",
                        value: 9,
                    },

                    {
                        name: "Sales Rep Supervisor",
                        value: 10,
                    },

                    {
                        name: "Manager",
                        value: 11,
                    },
                ]
            },

            {
                type: "list",
                message: "What is your employees department?",
                name: "department",
                choices: [
                    {
                        name: "Board of Directors",
                        value: 1,
                    },

                    {
                        name: "Legal",
                        value: 2,
                    },

                    {
                        name: "Human Resources",
                        value: 3,
                    },

                    {
                        name: "Engineering",
                        value: 4,
                    },

                    {
                        name: "Accounting",
                        value: 5,
                    },

                    {
                        name: "Sales",
                        value: 6,
                    },

                    {
                        name: "Management",
                        value: 7,
                    },
                ]
            },

            {
                type: "input",
                message: "What is your employees salary?",
                name: "salary"
            },
        ])
        .then(function (answer) {
            let newEmployee = [answer.employeeId, answer.first_name, answer.last_name, answer.title, answer.department];
            profile.push(newEmployee);

            console.log(`${answer.first_name} ${answer.last_name} has been added to the roster`);
            var query = "INSERT INTO employee VALUES (?,?,?,?,?)";
            connection.query(query, newEmployee, function (err, res) {
                if (err) throw err;
                console.table(res);
                decisions();
            });
        })
};
//Needs more work
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the roles ID number?",
                name: "addRoleId"
            },

            {
                type: "input",
                message: "What is the title of the role?",
                name: "addRoleTitle"
            },

            {
                type: "input",
                message: "What is the roles salary?",
                name: "addRoleSalary"
            },

            {
                type: "input",
                message: "What is the roles department ID number?",
                name: "addRoleDepartmentId"
            },


        ])
        .then(function (answer) {
            let newRole = [answer.addRoleId, answer.addRoleTitle, answer.addRoleSalary, answer.addRoleDepartmentId];
            roleArray.push(newRole);
            console.log(newRole);

            var query = "INSERT INTO role VALUES (?,?,?,?)";
            connection.query(query, newRole, function (err, res) {
                if (err) throw err;
                console.table(res);
                decisions();
            });
        })
}
// Needs more work
function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the departments ID number?",
                name: "addDepartmentId"
            },

            {
                type: "input",
                message: "What is the name of the department?",
                name: "addDepartmentName"
            },


        ])
        .then(function (answer) {
            let newDepartment = [answer.addDepartmentId, answer.addDepartmentName];
            departmentArray.push(newDepartment);
            console.log(newDepartment);
            var query = "INSERT INTO department VALUES (?,?)";
            connection.query(query, newDepartment, function (err, res) {
                if (err) throw err;
                console.table(res);
                decisions();
            });        })
}

function removeEmployee() {

    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            let employeeNameList = res[i].id + ' ' + res[i].first_name + ' ' + res[i].last_name;
            employeeNameArray.push(employeeNameList);
            console.log(employeeNameArray);
        };
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Which employee would you like to delete from the roster?",
                    name: "delete_employee",
                    choices: employeeNameArray
                }
            ]).then(function (answer) {
                let deleteEmployee = answer.delete_employee.slice(0, 2);
                connection.query("DELETE FROM employee WHERE ?", { id: deleteEmployee }, function (err, res) {
                    if (err) throw err;
                    decisions();
                })

                console.log(`${answer.delete_employee} has been removed from the roster`);

            })
    });

};

function updateEmployeeRole() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, role.id, role.title, role.salary, department.department ";
    query += "FROM department INNER JOIN role ON department.id = role.department_id ";
    query += "INNER JOIN employee ON role.id = employee.role_id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            let employeeNameList = res[i].first_name + ' ' + res[i].last_name;
            employeeNameArray.push(employeeNameList);
            let employeeRole = res[i].title;
            employeeRoleArray.push(employeeRole);
            console.log(employeeNameArray);
        };
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Which employee would you like to update their title?",
                    name: "update_employee",
                    choices: employeeNameArray
                },

                {
                    type: "list",
                    message: "What would you like to update their title to?",
                    name: "update_role",
                    choices: employeeRoleArray
                }
            ]).then(function (answer) {
                let updateEmployee = answer.update_employee.slice(0, 2);
                connection.query("UPDATE employee SET role_id = ? WHERE id = ? ", { id: updateEmployee }, function (err, res) {
                    if (err) throw err;
                    decisions();
                })

                console.log(`${answer.update_employee} now has the title of `);

            })
    });
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
                    {
                        name: "CEO",
                        value: 1,
                    },

                    {
                        name: "CFO",
                        value: 2,
                    },

                    {
                        name: "Lawyer",
                        value: 3,
                    },

                    {
                        name: "Software Engineer",
                        value: 4,
                    },

                    {
                        name: "HR Specialist",
                        value: 5,
                    },

                    {
                        name: "HR Supervisor",
                        value: 6,
                    },

                    {
                        name: "Accountant",
                        value: 7,
                    },

                    {
                        name: "Accountant Secretary",
                        value: 8,
                    },

                    {
                        name: "Sales Rep",
                        value: 9,
                    },

                    {
                        name: "Sales Rep Supervisor",
                        value: 10,
                    },

                    {
                        name: "Manager",
                        value: 11,
                    },
                ]
            }
        ]).then(function (answer) {
            console.log(answer);
            var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department ";
            query += "FROM department INNER JOIN role ON department.id = role.department_id ";
            query += "INNER JOIN employee ON role.id = employee.role_id ";
            query += "WHERE role.id = '" + answer.roleView + "';"
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.table(res);
                decisions();
            });
        });

}

// function addEmployee() {
//     inquirer
//         .prompt([
//             {
//                 type: "input",
//                 message: "What is your employees ID number?",
//                 name: "employeeId"
//             },

//             {
//                 type: "input",
//                 message: "What is your employees first name?",
//                 name: "first_name"
//             },

//             {
//                 type: "input",
//                 message: "What is your employees last name?",
//                 name: "last_name"
//             },

//             {
//                 type: "list",
//                 message: "What is your employees title?",
//                 name: "title",
//                 choices: [
//                     {
//                         name: "CEO",
//                         value: 1,
//                     },

//                     {
//                         name: "CFO",
//                         value: 2,
//                     },

//                     {
//                         name: "Lawyer",
//                         value: 3,
//                     },

//                     {
//                         name: "Software Engineer",
//                         value: 4,
//                     },

//                     {
//                         name: "HR Specialist",
//                         value: 5,
//                     },

//                     {
//                         name: "HR Supervisor",
//                         value: 6,
//                     },

//                     {
//                         name: "Accountant",
//                         value: 7,
//                     },

//                     {
//                         name: "Accountant Secretary",
//                         value: 8,
//                     },

//                     {
//                         name: "Sale Rep",
//                         value: 9,
//                     },

//                     {
//                         name: "Sales Rep Supervisor",
//                         value: 10,
//                     },

//                     {
//                         name: "Management",
//                         value: 11,
//                     },
//                 ]
//             },

//             {
//                 type: "list",
//                 message: "What is your employees department?",
//                 name: "department",
//                 choices: [
//                     {
//                         name: "Board of Directors",
//                         value: 1,
//                     },

//                     {
//                         name: "Legal",
//                         value: 2,
//                     },

//                     {
//                         name: "Human Resources",
//                         value: 3,
//                     },

//                     {
//                         name: "Engineering",
//                         value: 4,
//                     },

//                     {
//                         name: "Accounting",
//                         value: 5,
//                     },

//                     {
//                         name: "Sales",
//                         value: 6,
//                     },

//                     {
//                         name: "Management",
//                         value: 7,
//                     },
//                 ]
//             },

//             {
//                 type: "input",
//                 message: "What is your employees salary?",
//                 name: "salary"
//             },
//         ])
//         .then(function (answer) {
//             let newEmployee = [answer.employeeId, answer.first_name, answer.last_name, answer.title, answer.department];
//             profile.push(newEmployee);
//             console.log("New employee added");
//             var query = "INSERT INTO employee VALUES (?,?,?,?,?)";
//             connection.query(query, newEmployee, function (err, res) {
//                 if (err) throw err;
//                 console.table(res);
//                 decisions();
//             });
//         })
// };