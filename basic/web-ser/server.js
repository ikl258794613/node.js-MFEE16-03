const http = require("http");
const server = http.createServer((req, res) => {
  console.log("已連線");
  console.log(req.url);

  res.statusCode = 200; // 2xx, 3xx, 4xx, 5xx
  res.setHeader("Content-Type", "text/plain;charset=UTF-8");

  switch (req.url) {
    case "/":
      res.end("首頁");
      break;
    case "/test":
      res.end("測試頁面");
      break;
    case "/about":
      res.end("關於我們");
      break;
    default:
      res.writeHead(404);
      res.end("Not Found");
  }
});

// port
server.listen(3000, () => {
  console.log("連 3000 port");
});
