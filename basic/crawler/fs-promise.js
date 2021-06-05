const axios = require("axios");
const fs = require("fs/promises");
const moment = require("moment");

let today = moment().format("YYYYMMDD");
console.log(today);

// function stockPromise(fileName) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(fileName, "utf-8", (err, data) => {
//       err ? reject(err) : resolve(data);
//     });
//   });
// }

fs.readFile("stock.txt", "utf-8")
  .then((result) => {
    return axios({
      method: "get",
      url: "https://www.twse.com.tw/exchangeReport/STOCK_DAY?",
      params: {
        date: today,
        stockNo: result,
      },
    });
  })

  .then(function (response) {
    console.log(response.data.title);
  })
  .catch((err) => {
    console.log(err);
  });
