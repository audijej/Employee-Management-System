DROP DATABASE IF EXISTS employees_DB;
CREATE database employees_DB;

USE employees_DB;

CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(30) NULL,
  PRIMARY KEY (department_id)
);

CREATE TABLE roles (
  roles_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT,
  PRIMARY KEY (roles_id)
);

CREATE TABLE employee (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INT NULL,
  manager_id INT,
  PRIMARY KEY (employee_id)  
);

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;

INSERT INTO department (department_id, department)
VALUES (1, "Board of Directors"), (2, "Legal"), (3, "Human Resources"), (4, "Engineering"), (5, "Accounting"), (6, "Sales"), (7, "Management");

INSERT INTO roles (roles_id, title, salary, department_id)
VALUES (1, "CEO", 11500000.00, 1), (2, "CFO", 8000000, 1), (3, "Lawyer", 160000, 2), (4, "Software Engineer", 75000, 4), 
(5, "HR Specialist", 60000, 3), (6, "HR Supervisor", 70000, 3), (7, "Accountant", 75000, 5), (8, "Accountant Secretary", 50000, 5),
(9, "Sales Rep", 45000, 6), (10, "Sales Rep Supervisor", 55000, 6), (11, "Manager", 75000, 7);

INSERT INTO employee (employee_id, first_name, last_name, roles_id, manager_id)
VALUES (1, "Bill", "Gates", 1, 1), (2, "Paul", "Allen", 2, 2), (3, "Michelle", "Smith", 5, 11), (4, "Ron", "Burgundy", 4, 12), 
(5, "Michael", "Jordan", 3, 13), (6, "Angelina", "Jolie", 6, 14), (7, "Brad", "Pitt", 10, 11), (8, "Keeanu", "Reeves", 7, 11), 
(9, "Jennifer", "Anniston", 8, 12), (10, "Halley", "Berry", 8, 13), (11, "Paul", "Walker", 11, 14), (12, "Elon", "Musk", 11, 12),
(13, "Steve", "Jobs", 11, 13), (14, "Warren", "Buffet", 11, 14);