// db.js
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});



const connection1 = mysql.createConnection({
    host: process.env.DB_HOST1,
    user: process.env.DB_USER1,
    password: process.env.DB_PASSWORD1,
    database: process.env.DB_DATABASE1,
  });
  
  const connection2 = mysql.createConnection({
    host: process.env.DB_HOST2,
    user: process.env.DB_USER2,
    password: process.env.DB_PASSWORD2,
    database: process.env.DB_DATABASE2,
  });
  
  const connection3 = mysql.createConnection({
    host: process.env.DB_HOST3,
    user: process.env.DB_USER3,
    password: process.env.DB_PASSWORD3,
    database: process.env.DB_DATABASE3,
  });

  module.exports = {
    connection,
    connection1,
    connection2,
    connection3,
  };
  
  