const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({path: '../.env'});
console.log("DB ENV CHECK:", process.env.DATABASE_USER);  // should print "root"

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

module.exports = db;