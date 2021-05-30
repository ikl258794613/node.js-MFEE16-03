const axios = require("axios");
const fs = require("fs");

function stockPromise(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
}

async function stockawait() {
  try {
    let stockNO = await stockPromise("stock.txt");
    let axiosAwait = await axios
      .get(
        "https://www.twse.com.tw/exchangeReport/STOCK_DAY?",
        {
          params: {
            response: "json",
            date: 20210526,
            stockNo: stockNO,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        console.log(axiosAwait.data) 
  } catch(error){
    console.log(error);
  } finally {
  }
}

stockawait();
