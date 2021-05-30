const axios = require("axios").default;
const fs = require("fs");
//時間處理怪怪的，Date的時間要研究一下，目前抓的時間點是109年12月另外今天是假日應該沒有今天的股票資料
const moment = require("moment");




// let stockNo = fs.readFile('stock.txt','utf-8',(err,data)=>{
//   if (err) {
//     return console.error("讀檔錯誤", err);
//   }
//   console.log(`讀到的 stock code: ${data}`);
// })
let today = moment().format("YYYYMMDD"); 
// console.log(today);
function stockPromise(fileName) {
  return new Promise((resolve, reject) => {
    
    fs.readFile(fileName, "utf-8", (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
}


stockPromise("stock.txt").then((result) => {
  axios
    .get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY?",
      {
        params: {
          response: "json",
          date: today,
          stockNo: result,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(function (response) {
      // handle success
      console.log(response.data.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});
