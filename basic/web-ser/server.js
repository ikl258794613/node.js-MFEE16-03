const http = require("http");
const { URL } = require("url");
const fs = require("fs/promises");
const Promise = require("bluebird");
const readFileblue = Promise.promisify(fs.readFile);

const server = http.createServer(async (req, res) => {
  console.log("已連線");
  console.log(req.url);
  //將 url 一般化，移除他的query string非必要的斜線，一率小寫
  const path = req.url.replace(/\/?(?:\?.*)?$/, "").toLocaleLowerCase();
  console.log(`path:${path}`);
  // 處理query string
  const url = new URL(req.url, `http://${req.headers.host}`);
  console.log(url.searchParams);

  res.statusCode = 200; // 2xx, 3xx, 4xx, 5xx
  res.setHeader("Content-Type", "text/plain;charset=UTF-8");
  //router
  switch (req.url) {
    case "/":
      res.end("首頁");
      break;
    case "/test":
      res.setHeader("Content-Type", "text/html;charset=UTF-8");
      let content = await fs.readFile("test.html");
      res.end(content);
      break;
    case "/about":
      let name = url.searchParams.get("name") || "網友"; //||是預設值
      res.end(`Hi, ${name} 這是關於我們`);
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
