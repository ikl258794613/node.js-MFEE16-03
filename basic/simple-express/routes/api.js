const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/stocks", async (req, res) => {
  let results = await connection.queryAsync("SELECT * FROM stock");
  res.json(results);
});

module.exports = router;
