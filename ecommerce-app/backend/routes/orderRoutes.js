const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/place", (req, res) => {

  const { user_id, total } = req.body;

  db.query(
    "INSERT INTO orders(user_id, total) VALUES(?, ?)",
    [user_id, total],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json("Order Placed Successfully");
    }
  );
});

module.exports = router;