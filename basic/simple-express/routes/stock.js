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
  let stockCheck = await connection.queryAsync(
    "SELECT * FROM stock WHERE stock_id = ?",
    req.params.stockCode
  );
  //   if (stockCheck.length == 0) {
  //     throw new Error("無此代碼");
  //   }
  stockCheck = stockCheck[0];
  console.log(stockCheck);
  //   無此代碼這段沒效果
  let result = await connection.queryAsync(
    "SELECT * FROM stock_price WHERE stock_id = ? ORDER BY date",
    req.params.stockCode
  );
  let count = await connection.queryAsync(
    "SELECT COUNT(*) as total FROM stock_price WHERE stock_id=?;",
    req.params.stockCode
  );
  console.log(count); //[ RowDataPacket { total: 12 } ]
  const totalCount = count[0].total;
  const perPage = 5;
  const lastPage = Math.ceil(totalCount / perPage);
  const currentPage = req.query.page || 1; // page頁 預設第一頁
  const offset = (currentPage - 1) * perPage;
  let resultsPrices = await connection.queryAsync(
    "SELECT * FROM stock_price WHERE stock_id = ? ORDER BY date LIMIT ? OFFSET ?;",
    [req.params.stockCode, perPage, offset]
  );

  res.render("stock/detail", {
    stockCheck,
    stockPrices: resultsPrices,
    pagination: {
      lastPage,
      currentPage,
      totalCount,
    },
  });
});

module.exports = router;
