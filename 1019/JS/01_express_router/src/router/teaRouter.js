const crypto = require("crypto");
const express = require("express");

const router = express.Router();

const TEA_LIST = [];

router.get("/", (req, res) => {
  console.log("GET /teas");
  const teas = getAllTeas();
  res.json({
    error: null,
    data: teas,
  });
});

router.get("/:id", (req, res) => {
  console.log(`GET /teas/${id}`);
  const { id } = req.params;
  const tea = getSingleTea(id);
  res.json({
    error: null,
    data: tea,
  });
});

router.post("/", (req, res) => {
  console.log(`POST /teas`);
  const { type, orderedBy, count } = req.body;
  const tea = createTea({ type, orderedBy, count });
  res.statusCode = 201;
  res.json({
    error: null,
    data: tea,
  });
});

router.put("/:id", (req, res) => {
  console.log(`PUT /teas/${id}`);
  const { type, orderedBy } = req.body;
  const tea = updateTea({ type, orderedBy });
  res.json({
    error: null,
    data: tea,
  });
});

router.delete("/:id", (req, res) => {
  console.log(`DELETE /teas/${id}`);
  const { id } = req.params;
  const tea = deleteTea(id);
  res.json({
    error: null,
    data: tea,
  });
});

function createTea({ type, orderedBy, count }) {
  if (type === undefined) {
    const error = new Error(`티 타입을 명시해야합니다.`);
    error.statusCode = 400;
    throw error;
  }
  if (orderedBy === undefined || orderedBy === "") {
    const error = new Error(`주문자 이름을 명시해야합니다.`);
    error.statusCode = 400;
    throw error;
  }
  if (count !== undefined && count < 1) {
    const error = new Error(`티 수량은 1보다 높아야합니다.`);
    error.statusCode = 400;
    throw error;
  }

  const totalCount = count ?? 1;
  const createdTeas = new Array(totalCount);
  for (let i = 0; i < totalCount; i++) {
    createdTeas[i] = {
      id: crypto.randomUUID(),
      type,
      orderedBy,
    };
  }
  TEA_LIST.push(...createdTeas);
  return createdTeas;
}

function getAllTeas() {
  return TEA_LIST;
}

function getSingleTea(id) {
  const teaId = TEA_LIST.findIndex((tea) => tea.id === id);
  if (teaId > -1) {
    return TEA_LIST[teaId];
  }
  const error = new Error(`아이디가 '${id}'인 티를 찾지 못했습니다.`);
  error.statusCode = 400;
  throw error;
}

function updateTea(id, { type, orderedBy }) {
  const teaId = TEA_LIST.findIndex((tea) => tea.id === id);
  if (teaId === -1) {
    const error = new Error(`아이디가 '${id}'인 티를 찾지 못했습니다.`);
    error.statusCode = 400;
    throw error;
  }
  TEA_LIST[teaId] = { id, type, orderedBy };
  return TEA_LIST[teaId];
}

function deleteTea(id) {
  const teaId = TEA_LIST.findIndex((tea) => tea.id === id);
  if (teaId > -1) {
    const [tea] = TEA_LIST.splice(teaId, 1);
    return tea;
  }
  const error = new Error(`아이디가 '${id}'인 티를 찾지 못했습니다.`);
  error.statusCode = 400;
  throw error;
}

module.exports = router;
