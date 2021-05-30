const axios = require('axios').default;
const fs = require('fs');

// let stockNo = fs.readFile('stock.txt','utf-8',(err,data)=>{
//   if (err) {
//     return console.error("讀檔錯誤", err);
//   }
//   console.log(`讀到的 stock code: ${data}`);
// })
function stockPromise(fileName){
  return new Promise((resolve,reject) => {
    fs.readFile(fileName,'utf-8',(err,data)=>{
      err ? reject(err) : resolve(data);
    })
  })
}

stockPromise('stock.txt').then((result)=>{
  axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?',{
    params: {
      response: "json",
      date: "202105026",
      stockNo: result
    },
  },{
    headers: {
        'Content-Type': 'application/json',
    }
  })
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







