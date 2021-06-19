// $(function () {
//   $.ajax({
//     method: "GET",
//     url: "/api/stocks",
//     dataType: "json",
//   })
//     .done(function (data) {
//       console.log(data);
//     })
//     .fail(function (error) {
//       console.log(error);
//     })
//     .always(function () {});
// });

axios
  .get("/api/stocks")
  .then(function (data) {
    console.log(data.data);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {});
