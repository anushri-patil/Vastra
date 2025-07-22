const mysql = require("mysql2");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Anushri@123",
    database:'DB'
});


db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

module.exports = db;