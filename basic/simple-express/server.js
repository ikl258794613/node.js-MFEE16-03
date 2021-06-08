const express = require("express");
const moment = require("moment");
let today = moment().format();
let app = express();

//中介函式
app.use(function (req, res, next) {
  console.log(`有人在${today}來訪問`);
  next();
});

app.get("/", function (req, res) {
  res.send("index");
});

app.get("/about", function (req, res) {
  res.send("about A");
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
