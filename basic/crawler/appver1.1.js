const axios = require("axios");
const fs = require("fs/promises");
const moment = require("moment");
const mysql = require("mysql");
const Promise = require("bluebird");

require("dotenv").config();
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});
let today = moment().format("YYYYMMDD");
connection = Promise.promisifyAll(connection);

(async function () {
  try {
    await connection.connectAsync();
    let stockNo = await fs.readFile("stock.txt", "utf-8");
    stockNo = await stockNo.split(",");
    console.log(stockNo);
    for (let i of stockNo) {
      let BDcheck = await connection.queryAsync(
        `SELECT stock_id,stock_name FROM stock WHERE stock_id=?`,
        [i]
      );
      if (BDcheck.length == 0) {
        let axiosStock = await axios.get(
          `https://www.twse.com.tw/zh/api/codeQuery?query=${i}`
        );
        let resData = axiosStock.data.suggestions
          .map((data) => {
            return data.split("\t");
          })
          .find((data) => {
            return data[0] === i;
          });
        connection.queryAsync(
          `INSERT INTO stock (stock_id, stock_name) VALUES (?) ;`,
          [resData]
        );
        console.log(`成功寫進資料庫，股票代號為${resData[0]}`);
      } else {
        //   throw "股票查詢失敗";
      }
      let axiosAwait = await axios.get(
        "https://www.twse.com.tw/exchangeReport/STOCK_DAY?",
        {
          params: {
            response: "json",
            date: today,
            stockNo: i,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(axiosAwait.data.data);
      // console.log(axiosAwait.data.stat);
      if (axiosAwait.data.stat !== "OK") {
        throw "查詢失敗";
      } else {
        let price = axiosAwait.data.data.map((item) => {
          item = item.map((value) => {
            return value.replace(/,/g, "");
          });
          item[0] = parseInt(item[0].replace(/\//g, ""), 10) + 19110000;
          item[0] = moment(item[0], "YYYYMMDD").format("YYYY-MM-DD");
          item.unshift(i);
          return item;
        });
        //   console.log(price);
        let insertData = await connection.queryAsync(
          "INSERT IGNORE INTO  stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
          [price]
        ); // ? 不用括號。把api欄位console出來丟進資料庫對應欄位
        console.log(`成功寫入資料庫，代碼為${i}`);
      }
    }
    //  資料庫欄位 stock_id,date,open_price,high_price,low_price,close_price,delta_price,transactions,volume,amount
    //  api 欄位   "日期","成交股數","成交金額","開盤價","最高價","最低價","收盤價","漲跌價差","成交筆數"
    //           '110/06/01','69,310,196','3,021,848,745','43.15','44.80','42.85','43.00','+0.80','28,285'
    //  少 stock_id (stockNo)  欄位順序也不同，要記得改。
    //  要做的字串處理 1.日期:用正則把/去掉，變西元中間插入-變成2021-06-01
    //                2.把,符號都拿掉
  } catch (err) {
    console.error(err);
  } finally {
    connection.end();
  }
})();
