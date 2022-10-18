const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer();

const publicPath = path.resolve(__dirname, "../public");

const fsp = fs.promises;

// string ver.
server.on("request", async (req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/") {
    const indexFileString = await fsp.readFile(
      path.join(publicPath, "index.html"),
      {
        encoding: "utf-8",
      }
    );
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 200;
    res.write(indexFileString);
    res.end();
    return;
  }

  res.setHeader("Content-Type", "text/html");
  res.statusCode = 404;
  res.end();
});

// stream ver.
// server.on("request", (req, res) => {
//   const { method, url } = req;

//   if (method === "GET" && url === "/") {
//     res.setHeader("Content-Type", "text/html");
//     res.statusCode = 200;
//     fs.createReadStream(path.join(publicPath, "index.html")).pipe(res);
//     return;
//   }
//   res.setHeader("Content-Type", "text/html");
//   res.statusCode = 404;
//   res.end();
// });

server.listen(3000, () => {
  console.log("웹 서버가 포트 3000에서 운영중입니다 🚀");
});
