const db = require("../config/db.config.js");

db.query("CREATE DATABASE IF NOT EXISTS DB", (err, result) => {
  if (err) {
    console.log("DB error:", err);
  }
  console.log("Database created or already exists");
});

db.query(
  `CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    quantity INT DEFAULT 0,
    price DECIMAL(10,2) DEFAULT 0,
    image_url varchar(200)
  );`,
  (err, result) => {
    if (err) {
      console.log("Table creation error", err);
    } else {
      console.log("Table created or already exists");
    }
  }
);

module.exports = db;
