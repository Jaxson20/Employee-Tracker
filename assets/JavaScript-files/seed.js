const mysql = require('mysql2');

// Create connection
const connectionConfig1 = mysql.createConnection({
    host: process.env.DB_HOST1,
    user: process.env.DB_USER1,
    password: process.env.DB_PASSWORD1,
    database: process.env.DB_DATABASE1,
  });

  const connectionConfig2 = mysql.createConnection({
    host: process.env.DB_HOST2,
    user: process.env.DB_USER2,
    password: process.env.DB_PASSWORD2,
    database: process.env.DB_DATABASE2,
  });

  const connectionConfig3 = mysql.createConnection({
    host: process.env.DB_HOST3,
    user: process.env.DB_USER3,
    password: process.env.DB_PASSWORD3,
    database: process.env.DB_DATABASE3,
  });

  const connection1 = mysql.createConnection(connectionConfig1);
  const connection2 = mysql.createConnection(connectionConfig2);
  const connection3 = mysql.createConnection(connectionConfig3);

  // Define the role data to insert
const roleData = [
  { title: 'Software Engineer'},
  { title: 'Marketing Manager'},
  { title: 'Financial Analyst'},
  { title: 'Data Scientist'},
  { title: 'Product Manager'},
];

// Define the department data to insert
const departmentData = [
    { name: 'Marketing' },
    { name: 'Finance' },
    { name: 'Human Resources' },
    ];
  
  // Define the employee data to insert
  const employeeData = [
    { first_name: 'John', last_name: 'Doe', job_title: 'Software Engineer', salary: 80000.00 },
    { first_name: 'Jane', last_name: 'Smith', job_title: 'Marketing Manager', salary: 70000.00 },
    { first_name: 'Bob', last_name: 'Johnson', job_title: 'Financial Analyst', salary: 75000.00 },
  ];

// Insert the role data into the "roles" table
const insertQuery = 'INSERT INTO roles (title, salary) VALUES (?, ?)';
roleData.forEach((role) => {
  connection.query(insertQuery, [role.title, role.salary], (err, results) => {
    if (err) {
      console.error('Error inserting data into roles: ' + err.message);
    } else {
      console.log('Data inserted successfully');
    }
  });
});

// Insert the department data into the "departments" table
const insertDepartmentQuery = 'INSERT INTO departments (name) VALUES (?)';
departmentData.forEach((department) => {
  connection.query(insertDepartmentQuery, [department.name], (err, results) => {
    if (err) {
      console.error('Error inserting data into departments: ' + err.message);
    } else {
      console.log('Department data inserted successfully');
    }
  });
});

// Insert the employee data into the "employees" table
const insertEmployeeQuery = 'INSERT INTO employees (first_name, last_name, job_title, salary) VALUES (?, ?, ?, ?)';
employeeData.forEach((employee) => {
  connection.query(
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

// Close connection
connection1.end();
connection2.end();
connection3.end();

