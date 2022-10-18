const http = require("http");
const crypto = require("crypto");

const server = http.createServer();

const COFFEE_LIST = [];

server.on("request", (request, response) => {
  request.on("error", (error) => {
    console.log(error);
    response.statusCode = 400;
    response.end();
  });

  response.on("error", (error) => {
    console.log(error);
  });

  let bodyChunkList = [];

  request.on("data", (chunk) => {
    bodyChunkList.push(chunk);
  });

  request.on("end", () => {
    try {
      const body =
        bodyChunkList.length > 0
          ? JSON.parse(Buffer.concat(bodyChunkList).toString())
          : "";

      const { headers, method, url } = request;

      const [mainPath, ...subpaths] = parseUrl(url);

      if (mainPath === "api") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");

        const resourcePath = subpaths[0];

        if (resourcePath === "coffees") {
          switch (method) {
            case "POST": {
              // 커피 생성
              const coffee = createCoffee(body);
              response.statusCode = 201;
              response.end(
                JSON.stringify({
                  data: coffee,
                  error: null,
                })
              );
              return;
            }
            case "GET": {
              // 하나만 가져오기
              if (subpaths[1] !== "" && subpaths[1] !== undefined) {
                const coffeeId = subpaths[1];
                const coffee = getSingleCoffee(coffeeId);
                response.end(
                  JSON.stringify({
                    data: coffee,
                    error: null,
                  })
                );
                return;
              }
              // 모든 커피 가져오기
              const coffees = getAllCoffee();
              response.end(
                JSON.stringify({
                  data: coffees,
                  error: null,
                })
              );
              return;
            }
            case "PUT": {
              if (subpaths[1] !== "" && subpaths[1] !== undefined) {
                const coffeeId = subpaths[1];
                const updatedCoffee = updateCoffee(coffeeId, body);
                response.end(
                  JSON.stringify({
                    data: updatedCoffee,
                    error: null,
                  })
                );
                return;
              }
              // id가 없으면 에러 던지기
              const error = new Error(
                "ID를 제시해야 커피를 업데이트할 수 있습니다."
              );
              error.statusCode = 400;
              throw error;
            }
            case "DELETE": {
              if (subpaths[1] !== undefined && subpaths[1] !== null) {
                const coffeeId = subpaths[1];
                const deletedCoffee = deleteCoffee(coffeeId);
                response.end(
                  JSON.stringify({
                    data: deletedCoffee,
                    error: null,
                  })
                );
                return;
              }
              // id가 없으면 에러 던지기
              const error = new Error(
                "ID를 제시해야 커피를 삭제할 수 있습니다."
              );
              error.statusCode = 400;
              throw error;
            }
            default: {
              const error = new Error(
                `HTTP 메소드 '${method}'은 지원하지 않습니다.`
              );
              error.statusCode = 405;
              throw error;
            }
          }
        }
      }

      response.statusCode = 404;
      response.end(
        JSON.stringify({
          data: null,
          error: "리소스를 찾지 못했습니다.",
        })
      );
    } catch (error) {
      console.log(error);
      response.statusCode = error.statusCode ?? 400;
      response.end(
        JSON.stringify({
          data: null,
          error: error.message,
        })
      );
    }
  });
});

server.listen(3000, () => {
  console.log("카페 서버가 포트 3000에서 운영중입니다 🚀");
});

function parseUrl(url) {
  const paths = url.split("/");
  return paths.slice(1);
}

function createCoffee({ type, orderedBy, count }) {
  if (type === undefined) {
    throw new Error(`커피 타입을 명시해야합니다.`);
  }
  if (orderedBy === undefined || orderedBy === "") {
    throw new Error(`주문자 이름을 명시해야합니다.`);
  }
  if (count !== undefined && count < 1) {
    throw new Error(`커피 수량은 1보다 높아야합니다.`);
  }

  const totalCount = count ?? 1;
  const createdCoffees = new Array(totalCount);
  for (let i = 0; i < totalCount; i++) {
    createdCoffees[i] = {
      id: crypto.randomUUID(),
      type,
      orderedBy,
    };
  }
  COFFEE_LIST.push(...createdCoffees);
  return createdCoffees;
}

function getAllCoffee() {
  return COFFEE_LIST;
}

function getSingleCoffee(id) {
  const coffeeId = COFFEE_LIST.findIndex((coffee) => coffee.id === id);
  if (coffeeId > -1) {
    return COFFEE_LIST[coffeeId];
  }
  throw new Error(`아이디가 '${id}'인 커피를 찾지 못했습니다.`);
}

function updateCoffee(id, { type, orderedBy }) {
  const coffeeId = COFFEE_LIST.findIndex((coffee) => coffee.id === id);
  if (coffeeId === -1) {
    throw new Error(`아이디가 '${id}'인 커피를 찾지 못했습니다.`);
  }
  COFFEE_LIST[coffeeId] = { id, type, orderedBy };
  return COFFEE_LIST[coffeeId];
}

function deleteCoffee(id) {
  const coffeeId = COFFEE_LIST.findIndex((coffee) => coffee.id === id);
  if (coffeeId > -1) {
    const [coffee] = COFFEE_LIST.splice(coffeeId, 1);
    return coffee;
  }
  throw new Error(`아이디가 '${id}'인 커피를 찾지 못했습니다.`);
}
