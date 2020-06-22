DROP DATABASE IF EXISTS employees_DB;
CREATE database employees_DB;

USE employees_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
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
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)  
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

INSERT INTO department (id, department)
VALUES (1, "Board of Directors"), (2, "Board of Directors");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "CEO", 11500000.00, 1), (2, "CFO", 8000000, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Bill", "Gates", 1, 1), (2, "Paul", "Allen", 2, 2)