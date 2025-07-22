const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const multer = require('multer');
const productRoutes = require("./routes/routes.js");
require("./models/model.js"); // triggers DB + table creation

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../images')));

// API routes
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/products', productRoutes);



// Start server
app.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});
