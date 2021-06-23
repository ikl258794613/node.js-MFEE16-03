const express = require("express");
const moment = require("moment");
const connection = require("./utils/db");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
//同層的用./utils/db

let today = moment().format();
let app = express();

//中介函式
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
//第一個views是變數，第2個是資料夾名稱
app.set("views", "views");
app.set("view engine", "pug");
app.use(cookieParser());
app.use(express.json());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);
app.use(function (req, res, next) {
  // 把 request 的 session 資料設定給 res 的 locals
  // views 就可以取得資料
  res.locals.member = req.session.member;
  next();
});
// locals 是 response 物件提供的一個屬性
// 讓我們可以傳遞資料到 views

app.use(function (req, res, next) {
  // 因為訊息只希望被顯示一次！
  // 所以傳到 views 一次後，就刪掉
  if (req.session.message) {
    res.locals.message = req.session.message;
    delete req.session.message;
  }
  next();
});

//中介函式

//路由
app.use(function (req, res, next) {
  console.log(`有人在${today}來訪問`);
  next();
});
app.use(function (req, res, next) {
  res.locals.member = req.session.member;
  next();
});

app.use(function (req, res, next) {
  if (req.session.message) {
    res.locals.message = req.session.message;
    delete req.session.message;
  }
  next();
});

let stockRouter = require("./routes/stock");
let memberRouter = require("./routes/member");
let apiRouter = require("./routes/api");
let authRouter = require("./routes/auth");

app.use("/stock", stockRouter);
app.use("/member", memberRouter);
app.use("/api", apiRouter);
app.use("/auth", authRouter);

app.get("/", function (req, res) {
  // res.send("Hello Express BBB");
  res.cookie("lang", "zh-TW");
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

app.use(function (err, req, res, next) {
  console.log("ERROR:", err);
  res.status(500);
  res.send("500 - Internal Sever Error 請洽系統管理員");
});

app.listen(3000, async () => {
  //在web server開始時連線db，不寫預設也會幫你連但養成習慣寫一下
  await connection.connectAsync();
  console.log(`連接到port3000`);
});
