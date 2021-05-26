const axios = require('axios').default;

axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?',{
    params: {
      response: "json",
      date: "202105026",
      stockNo: "0050",
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

    