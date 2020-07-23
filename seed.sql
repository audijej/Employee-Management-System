DROP DATABASE IF EXISTS employees_DB;
CREATE database employees_DB;

USE employees_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  roles_id INT,
  manager_id INT,
  PRIMARY KEY (id)  
);

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;

INSERT INTO department (id, department)
VALUES (1, "Board of Directors"), (2, "Legal"), (3, "Human Resources"), (4, "Engineering"), (5, "Accounting"), (6, "Sales"), (7, "Management");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "CEO", 11500000.00, 1), (2, "CFO", 8000000, 1), (3, "Lawyer", 160000, 2), (4, "Software Engineer", 75000, 4), 
(5, "HR Specialist", 60000, 3), (6, "HR Supervisor", 70000, 3), (7, "Accountant", 75000, 5), (8, "Accountant Secretary", 50000, 5),
(9, "Sales Rep", 45000, 6), (10, "Sales Rep Supervisor", 55000, 6), (11, "Manager", 75000, 7);

INSERT INTO employee (id, first_name, last_name, roles_id, manager_id)
VALUES (1, "Bill", "Gates", 1, 1), (2, "Paul", "Allen", 2, 2), (3, "Michelle", "Smith", 5, 10), (4, "Ron", "Burgundy", 4, 22), 
(5, "Michael", "Jordan", 3, 22), (6, "Angelina", "Jolie", 6, 22), (7, "Brad", "Pitt", 10, 22), (8, "Keeanu", "Reeves", 7, 22), 
(9, "Jennifer", "Anniston", 8, 22), (10, "Halley", "Berry", 8, 22), (11, "Paul", "Walker", 11, 50), (12, "Elon", "Musk", 11, 51),
(13, "Steve", "Jobs", 11, 52), (14, "Warren", "Buffet", 11, 53);