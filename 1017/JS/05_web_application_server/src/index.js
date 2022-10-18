const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer();

const publicPath = path.resolve(__dirname, "../public");

const fsp = fs.promises;

function parseUrl(url) {
  const paths = url.split("/");
  return paths.slice(1);
}

async function renderHtml(htmlPath, values) {
  const templateHtml = await fsp.readFile(htmlPath, {
    encoding: "utf-8",
  });
  const keys = Object.keys(values);
  const keyAndTemplateVariableTuples = keys.map((key) => {
    return [key, `{{ ${key} }}`];
  });
  let result = templateHtml;

  for (keyAndTemplateVariable of keyAndTemplateVariableTuples) {
    const [key, templateVariable] = keyAndTemplateVariable;
    result = result.replaceAll(templateVariable, values[key]);
  }
  return result;
}

server.on("request", async (req, res) => {
  const { method, url } = req;

  const [mainPath, ...subpaths] = parseUrl(url);

  if (method === "GET" && mainPath === "users") {
    const username = subpaths[0] ?? "Anonymous";
    const htmlString = await renderHtml(path.join(publicPath, "index.html"), {
      username,
    });
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 200;
    res.write(htmlString);
    res.end();
    return;
  }

  res.setHeader("Content-Type", "text/html");
  res.statusCode = 404;
  res.end();
});

server.listen(3000, () => {
  console.log("웹 어플리케이션 서버가 포트 3000에서 운영중입니다 🚀");
});
