const express = require("express");
const moment = require("moment");
const connection = require("./utils/db");
//同層的用./utils/db

let today = moment().format();
let app = express();

//中介函式
app.use(express.static("public"));
//第一個views是變數，第2個是資料夾名稱
app.set("views", "views");
app.set("view engine", "pug");

app.use(function (req, res, next) {
  console.log(`有人在${today}來訪問`);
  next();
});

app.get("/", function (req, res) {
  // res.send("Hello Express BBB");
  res.render("index");
  // views/index.pug
});

app.get("/about", function (req, res, next) {
  // res.send("About Express AAAA");
  res.render("about");
});
// app.get("/about", function(req,res){
//   res.send("about B")
// })
//同時有兩個about，只會有A出現。

app.get("/test", function (req, res) {
  res.send("test");
});

app.get("/stock", async function (req, res) {
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

app.get("/stock/:stockCode", async (req, res) => {
  let result = await connection.queryAsync(
    "SELECT * FROM stock_price WHERE stock_id = ? ORDER BY date",
    req.params.stockCode
  );
  res.render("stock/detail", {
    stockPrices: result,
  });
});

app.listen(3000, async () => {
  //在web server開始時連線db，不寫預設也會幫你連但養成習慣寫一下
  await connection.connectAsync();
  console.log(`連接到port3000`);
});
