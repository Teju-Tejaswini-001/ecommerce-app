const express = require("express");
const db = require("../db");

const router = express.Router();


// ADD PRODUCT

router.post("/add", (req, res) => {

  const {
    name,
    price,
    image,
    description
  } = req.body;

  db.query(
    "INSERT INTO products(name, price, image, description) VALUES(?,?,?,?)",
    [name, price, image, description],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json("Product Added Successfully");
    }
  );
});


// GET ALL PRODUCTS

router.get("/", (req, res) => {

  db.query(
    "SELECT * FROM products",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});


// GET SINGLE PRODUCT

router.get("/:id", (req, res) => {

  const { id } = req.params;

  db.query(
    "SELECT * FROM products WHERE id = ?",
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);
    }
  );
});

module.exports = router;