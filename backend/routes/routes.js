const express = require("express");
const router = express.Router();
const db = require("../config/db.config");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../images'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// GET all products
router.get('/', (req, res) => {
    db.query("SELECT * FROM products", (err, data) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json(data);
    });
});

// POST new product
router.post('/', upload.single("image"), (req, res) => {
    console.log("file is there", req.file);
    if(!req.file) return res.json({error: "image not uploaded"});

    const { name, description, quantity, price } = req.body;
    const image_url = "/images/" + req.file.filename;
    db.query(
        "INSERT INTO products (name, description, quantity, price, image_url) VALUES (?, ?, ?, ?, ?)",
        [name, description, quantity, price, image_url],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.send("Product added");
        }
    );
    console.log("BODY", req.body);
});

//update product
router.put('/:id', upload.single("image"), (req, res) => {
  const { name, description, quantity, price } = req.body;
  const id = req.params.id;

  let sql, params;

  if (req.file) {
    const image_url = "/images/" + req.file.filename;
    sql = "UPDATE products SET name=?, description=?, quantity=?, price=?, image_url=? WHERE id=?";
    params = [name, description, quantity, price, image_url, id];
  } else {
    sql = "UPDATE products SET name=?, description=?, quantity=?, price=? WHERE id=?";
    params = [name, description, quantity, price, id];
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product updated" });
  });
  console.log("FILE:", req.file);
});


//delete
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id=?", [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Product deleted" });
  });
});


module.exports = router;
