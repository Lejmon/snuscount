require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(require("cors")()); // Povolenie CORS pre frontend

// 🔹 Pripojenie k MySQL databáze
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "root",
    database: process.env.DB_NAME || "mydatabase",
});

db.connect(err => {
    if (err) {
        console.error("Chyba pripojenia k databáze:", err);
    } else {
        console.log("Pripojenie k databáze úspešné!");
    }
});

// 🔹 API endpoint na získanie používateľov
app.get("/api/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

app.listen(PORT, () => console.log(`Server beží na porte ${PORT}`));
