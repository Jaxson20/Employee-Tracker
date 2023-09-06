const mysql = require('mysql2');
require('dotenv').config();
const inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // Specify the database name from your .env file
});   


const { connection1, connection2, connection3 } = require('../db/db.js');

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.message);
    return;
  }
  console.log('Connected to the database');
  mainMenu();
});

// Function to display the main menu
function mainMenu() {
  inquirer
    .prompt({
      type: 'list',
      name: 'choice',
      message: 'Choose an option:',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    })
    .then((answers) => {
      switch (answers.choice) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          connection.end();
          console.log('Goodbye!');
          break;
        default:
          console.log('Invalid choice. Please try again.');
          mainMenu();
          break;
      }
    });
}

// Function to view all departments
function viewDepartments() {
  // Write and execute SQL query to view departments
  const query = 'SELECT * FROM department_db.departments';
  connection1.query(query, (err, results) => {
    if (err) {
      console.error('Error viewing departments: ' + err.message);
    } else {
      console.table(results);
    }
    mainMenu();
  });
}

// Function to view all roles
function viewRoles() {
  // Write and execute SQL query to view roles
  const query = 'SELECT * FROM roles_db.roles';
  connection2.query(query, (err, results) => {
    if (err) {
      console.error('Error viewing roles: ' + err.message);
    } else {
      console.table(results);
    }
    mainMenu();
  });
}

// Function to view all employees
function viewEmployees() {
  // Write and execute SQL query to view employees
  const query = 'SELECT * FROM employees_db.employees';
  connection3.query(query, (err, results) => {
    if (err) {
      console.error('Error viewing employees: ' + err.message);
    } else {
      console.table(results);
    }
    mainMenu();
  });
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt({
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:',
    })
    .then((answers) => {
      // Write and execute SQL query to add a department
      const query = 'INSERT INTO departments (name) VALUES (?)';
      connection.query(query, [answers.name], (err, results) => {
        if (err) {
          console.error('Error adding department: ' + err.message);
        } else {
          console.log('Department added successfully.');
        }
        mainMenu();
      });
    });
}

// Function to add a role
function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role:',
      },
      // You can add more prompts for role-related information here
    ])
    .then((answers) => {
      // Write and execute SQL query to add a role
      const query = 'INSERT INTO roles (title, salary) VALUES (?, ?)';
      connection.query(query, [answers.title, answers.salary], (err, results) => {
        if (err) {
          console.error('Error adding role: ' + err.message);
        } else {
          console.log('Role added successfully.');
        }
        mainMenu();
      });
    });
}

// Function to add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the first name of the employee:',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the last name of the employee:',
      },
      // You can add more prompts for employee-related information here
    ])
    .then((answers) => {
      // Write and execute SQL query to add an employee
      const query = 'INSERT INTO employees (first_name, last_name) VALUES (?, ?)';
      connection.query(query, [answers.first_name, answers.last_name], (err, results) => {
        if (err) {
          console.error('Error adding employee: ' + err.message);
        } else {
          console.log('Employee added successfully.');
        }
        mainMenu();
      });
    });
}

// Function to update an employee's role
function updateEmployeeRole() {
    // Prompt to select an employee to update
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: 'Enter the ID of the employee you want to update:',
        },
        {
          type: 'input',
          name: 'newRoleId',
          message: 'Enter the new role ID for the employee:',
        },
      ])
      .then((answers) => {
        // Write and execute SQL query to update employee's role
        const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
        connection.query(
          query,
          [answers.newRoleId, answers.employeeId],
          (err, results) => {
            if (err) {
              console.error('Error updating employee role: ' + err.message);
            } else {
              console.log('Employee role updated successfully.');
            }
            mainMenu();
          }
        );
      });
  }
  

