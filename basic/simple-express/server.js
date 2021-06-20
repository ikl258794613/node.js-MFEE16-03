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
//中介函式

let stockRouter = require("./routes/stock");
app.use("/stock", stockRouter);

let apiRouter = require("./routes/api");
app.use("/api", apiRouter);

let authRouter = require("./routes/auth");
app.use("/auth", authRouter);
//路由
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

app.use(function (req, res, next) {
  res.status(404);
  res.render("404");
});

app.listen(3000, async () => {
  //在web server開始時連線db，不寫預設也會幫你連但養成習慣寫一下
  await connection.connectAsync();
  console.log(`連接到port3000`);
});
