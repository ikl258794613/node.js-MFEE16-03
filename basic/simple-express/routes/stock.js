const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/", async function (req, res) {
  let result = await connection.queryAsync("SELECT * FROM stock");
  //console.log(`目前有${stocks}這些資料`);
  //[object Object],[object Object],[object Object],[object Object],[object Object]
  //console.log 一堆[object Object] 但是在網頁上能顯示? 老師上課也能正常顯示
  //console.log(`目前有${stocks.stock_name}這些資料`);
  //目前有undefined這些資料
  // console.log  stocks.stock_name 結果 undefined ??
  res.render("stock/list", {
    stocks: result,
  });
});

router.get("/:stockCode", async (req, res) => {
  let result = await connection.queryAsync(
    "SELECT * FROM stock_price WHERE stock_id = ? ORDER BY date",
    req.params.stockCode
  );
  res.render("stock/detail", {
    stockPrices: result,
  });
});

module.exports = router;
