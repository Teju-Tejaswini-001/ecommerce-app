const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users(name,email,password) VALUES(?,?,?)",
    [name, email, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json("User Registered");
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {

      if (result.length === 0) {
        return res.status(404).json("User not found");
      }

      const validPassword = await bcrypt.compare(
        password,
        result[0].password
      );

      if (!validPassword) {
        return res.status(400).json("Wrong Password");
      }

      const token = jwt.sign(
        { id: result[0].id },
        "secretkey"
      );

      res.json({ token });
    }
  );
});

module.exports = router;