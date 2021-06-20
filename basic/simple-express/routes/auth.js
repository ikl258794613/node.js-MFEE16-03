const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../utils/db");
const bcrypt = require("bcrypt");
const registerRules = [
  body("email").isEmail().withMessage("請正確輸入 Email 格式"),
  body("password").isLength({ min: 6 }),
  body("confirmPassword").custom((value, { req }) => {
    return value === req.body.password;
  }),
];
router.get("/register", (req, res) => {
  res.render("auth/register");
});
router.post("/register", registerRules, async (req, res, next) => {
  console.log(req.body);

  const Result = validationResult(req);
  if (!Result.isEmpty()) {
    return next(new Error("註冊有問題"));
  }

  let check = await connection.queryAsync(
    "SELECT * FROM members WHERE email = ?",
    req.body.email
  );
  if (check.length > 0) {
    return next(new Error("email已註冊"));
  }
  //通過check,寫入資料庫
  let result = await connection.queryAsync(
    "INSERT INTO members (email,password,name) VALUES (?) ",
    [[req.body.email, await bcrypt.hash(req.body.password, 10), req.body.name]]
  );
  res.send("這是POST");
});
router.get("/login", (req, res) => {
  res.render("auth/login");
});

module.exports = router;
