const express = require("express");
const moment = require("moment");
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

app.listen(3000, () => {
  console.log(`連接到port3000`);
});
