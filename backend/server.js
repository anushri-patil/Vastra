const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Anushri@123",
    database:'vastra'
});
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// db.query("create database if not exists vastra", (err,result) =>{
//     if(err){
//         console.log("DB error:", err);
//     }
//     console.log("database created", result);
// })

// db.query(`create table if not exists products (
//     id int auto_increment primary key,
//     name varchar(100) not null,
//     description text,
//     quantity int default 0,
//     price decimal(10,2) default 0
//     );`, (err,result) => {
//     if(err){
//         console.log("table creation error", err);
//     } else{
//         console.log("table created already");
//     }
// });

// db.query("alter table products add column image_url varchar(200);", (err,result) => {
//     if(err){
//         console.log("error", err);
//     } else{
//         console.log("image_url already exists");
//     }
// });

// const query = `insert into products(name,description,quantity,price,image_url) values 
// ('Red Silk Saree with White Border', 'A classic red silk saree with a pristine white border, ideal for weddings and festive rituals.', 10, 2499.00, '/images/1.red-white.jpg'),
// ('Onion Pink Silk Saree', 'This elegant onion-colored silk saree with a pink border adds a soft charm to evening celebrations.', 8, 2299.00, '/images/2.onion-color-pink.jpg'),
// ('Purple and Pink Silk Saree', 'Radiate grace in this royal purple silk saree featuring a vibrant pink border, perfect for family functions.', 7, 2399.00, '/images/3.purple-pink.jpg'),
// ('Blue and Pink Silk Saree', 'A serene blue silk saree with a contrasting pink border that blends tradition with style — ideal for pujas.', 12, 2199.00, '/images/4.blue-pink.jpg'),
// ('Green and Blue Silk Saree', 'A refreshing green silk saree with a subtle blue border, designed for day-time gatherings and temple visits.', 9, 2099.00, '/images/5.green-blue.jpg'),
// ('Yellow and Purple Silk Saree', 'Bright and cheerful, this yellow silk saree with a rich purple border brings joy to festive mornings.', 11, 2499.00, '/images/6.yellow-purple.jpg'),
// ('Pink and Purple Silk Saree', 'Celebrate femininity in this charming pink silk saree with a graceful purple border — perfect for receptions.', 6, 2599.00, '/images/7.pink-purple.jpg'),
// ('Pink Silk Saree with Zari Border', 'A luxurious pink silk saree adorned with a shimmering zari border, crafted for grand occasions.', 5, 2799.00, '/images/8.pink-zari.jpg'),
// ('Yellow and Blue Silk Saree', 'Stand out in this radiant yellow silk saree with a cool blue border, great for cultural and festive programs.', 10, 2299.00, '/images/9.yellow-blue.jpg'),
// ('Classic Blue Silk Saree', 'A deep blue silk saree with a matching tone-on-tone border that speaks of elegance and timeless beauty.', 7, 2199.00, '/images/10.blue.jpg');`

// db.query(query, (err, result)=>{
//     if(err){
//         console.log("error", err);
//     } else{
//         console.log("inserted");
//     }
// });

//get to fetch products
app.get('/products' ,(req, res) => {
    const sql = "select * from products";
    db.query(sql, (err,data) => {
        if(err){
            console.log("error", err);
        }
        res.status(200).json(data);
    });
    // res.status(200);
    // res.send("express js tutorial");
});


app.post('/products', (req,res) => {
    const {name, description, quantity, price} = req.body;
    const sql = "insert into products (name, description, quantity, price) values (?, ?, ?, ?)"
    db.query(sql, [name, description, quantity, price], (err, result) => {
        if(err){
            console.log("db error", err);
        }
        res.send("product added");
    });
});


app.put('/products/:id', (req,res) => {
    const {name, description, quantity, price} = req.body;
    const {id} = req.params;

    const sql = "update products set name=?, description=?, quantity=?, price=? where id=?"
    const params = [name,description,quantity, price, id];

    db.query(sql, params, (err,result) => {
        if(err){
            console.log("error", err);
        }
        res.send("product is updated");
    });
});







app.listen(8080, () => {
    console.log("server running on localhost:8080");
})

