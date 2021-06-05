const axios = require("axios");
const fs = require("fs/promises");
const moment = require("moment");
const mysql = require("mysql");
const Promise = require("bluebird");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "FAKEpassword",
  database: "node",
});

connection = Promise.promisifyAll(connection);

(async function () {
  try {
    //先開連線
    await connection.connectAsync();
    //讀檔案股票代碼
    let stockNo = await fs.readFile("stock.txt", "utf-8");
    //檢查資料庫有沒有這個代碼
    //console.log(stockNo);
    //2316
    let BDcheck = await connection.queryAsync(
      `SELECT stock_id,stock_name FROM stock WHERE stock_id='${stockNo}'`
    );
    // console.log(BDcheck);
    //沒找到是空陣列[]
    //如果沒找到就用axios要
    if (BDcheck.length == 0) {
      let axiosStock = await axios.get(
        `https://www.twse.com.tw/zh/api/codeQuery?query=${stockNo}`
      );
      //console.log(axiosStock);
      //axiosStock是一個很大的物件，可以看到裡面最後有data: { query: '2316', suggestions: [ '2316\t楠梓電' ] }
      //去拿data.suggestions
      let resData = axiosStock.data.suggestions
        .map((data) => {
          return data.split("\t");
          //console.log(resData);
          //[ [ '2316', '楠梓電' ] ]
        })
        .find((data) => {
          return data[0] === stockNo;
        });
      //console.log(resData);
      //[ '2316', '楠梓電' ]
      //找到目標，寫進資料庫
      connection.queryAsync(
        `INSERT INTO stock (stock_id, stock_name) VALUES ('${resData[0]}','${resData[1]}') `
      );
    }
    //資料庫已有檔案
    else {
      console.log("資料庫已有檔案");
    }
  } catch (err) {
    console.error(err);
  } finally {
    connection.end();
  }
})();
