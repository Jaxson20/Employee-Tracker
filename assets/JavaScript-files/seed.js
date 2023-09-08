const mysql = require('mysql2');
require('dotenv').config();

// Create MySQL connections for each database
const connectionConfig1 = {
  host: process.env.DB_HOST1,
  user: process.env.DB_USER1,
  password: process.env.DB_PASSWORD1,
  database: process.env.DB_DATABASE1,
};

const connectionConfig2 = {
  host: process.env.DB_HOST2,
  user: process.env.DB_USER2,
  password: process.env.DB_PASSWORD2,
  database: process.env.DB_DATABASE2,
};

const connectionConfig3 = {
  host: process.env.DB_HOST3,
  user: process.env.DB_USER3,
  password: process.env.DB_PASSWORD3,
  database: process.env.DB_DATABASE3,
};

const connection1 = mysql.createConnection(connectionConfig1);
const connection2 = mysql.createConnection(connectionConfig2);
const connection3 = mysql.createConnection(connectionConfig3);

// Define data to insert into each table
const departmentData = [
  { name: 'Marketing' },
  { name: 'Finance' },
  { name: 'Human Resources' },
];

const roleData = [
  { title: 'Software Engineer', salary: 80000.00 },
  { title: 'Marketing Manager', salary: 70000.00 },
  { title: 'Financial Analyst', salary: 75000.00 },
];

const employeeData = [
  { first_name: 'John', last_name: 'Doe', job_title: 'Software Engineer', salary: 80000.00 },
  { first_name: 'Jane', last_name: 'Smith', job_title: 'Marketing Manager', salary: 70000.00 },
  { first_name: 'Bob', last_name: 'Johnson', job_title: 'Financial Analyst', salary: 75000.00 },
];

// Insert data into each table
const insertDepartmentQuery = 'INSERT INTO department_db.departments (name) VALUES (?)';
departmentData.forEach((department) => {
  connection1.query(insertDepartmentQuery, [department.name], (err, results) => {
    if (err) {
      console.error('Error inserting data into departments: ' + err.message);
    } else {
      console.log('Department data inserted successfully');
    }
  });
});

const insertRoleQuery = 'INSERT INTO roles_db.roles (title, salary) VALUES (?, ?)';
roleData.forEach((role) => {
  connection2.query(insertRoleQuery, [role.title, role.salary], (err, results) => {
    if (err) {
      console.error('Error inserting data into roles: ' + err.message);
    } else {
      console.log('Role data inserted successfully');
    }
  });
});

const insertEmployeeQuery = 'INSERT INTO employees_db.employees (first_name, last_name, job_title, salary) VALUES (?, ?, ?, ?)';
employeeData.forEach((employee) => {
  connection3.query(
    insertEmployeeQuery,
    [employee.first_name, employee.last_name, employee.job_title, employee.salary],
    (err, results) => {
      if (err) {
        console.error('Error inserting data into employees: ' + err.message);
      } else {
        console.log('Employee data inserted successfully');
      }
    }
  );
});

// Close connections
connection1.end();
connection2.end();
connection3.end();

module.exports = {
  connection1,
  connection2,
  connection3,
};

