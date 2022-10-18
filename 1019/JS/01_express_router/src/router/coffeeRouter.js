const crypto = require("crypto");
const express = require("express");

const router = express.Router();

const COFFEE_LIST = [];

router.get("/", (req, res) => {
  console.log("GET /coffees");
  const coffees = getAllCoffees();
  res.json({
    error: null,
    data: coffees,
  });
});

router.get("/:id", (req, res) => {
  console.log(`GET /coffees/${id}`);
  const { id } = req.params;
  const coffee = getSingleCoffee(id);
  res.json({
    error: null,
    data: coffee,
  });
});

router.post("/", (req, res) => {
  console.log(`POST /coffees`);
  const { type, orderedBy, count } = req.body;
  const coffee = createCoffee({ type, orderedBy, count });
  res.statusCode = 201;
  res.json({
    error: null,
    data: coffee,
  });
});

router.put("/:id", (req, res) => {
  console.log(`PUT /coffees/${id}`);
  const { type, orderedBy } = req.body;
  const coffee = updateCoffee({ type, orderedBy });
  res.json({
    error: null,
    data: coffee,
  });
});

router.delete("/:id", (req, res) => {
  console.log(`DELETE /coffees/${id}`);
  const { id } = req.params;
  const coffee = deleteCoffee(id);
  res.json({
    error: null,
    data: coffee,
  });
});

function createCoffee({ type, orderedBy, count }) {
  if (type === undefined) {
    const error = new Error(`커피 타입을 명시해야합니다.`);
    error.statusCode = 400;
    throw error;
  }
  if (orderedBy === undefined || orderedBy === "") {
    const error = new Error(`주문자 이름을 명시해야합니다.`);
    error.statusCode = 400;
    throw error;
  }
  if (count !== undefined && count < 1) {
    const error = new Error(`커피 수량은 1보다 높아야합니다.`);
    error.statusCode = 400;
    throw error;
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

function getAllCoffees() {
  return COFFEE_LIST;
}

function getSingleCoffee(id) {
  const coffeeId = COFFEE_LIST.findIndex((coffee) => coffee.id === id);
  if (coffeeId > -1) {
    return COFFEE_LIST[coffeeId];
  }
  const error = new Error(`아이디가 '${id}'인 커피를 찾지 못했습니다.`);
  error.statusCode = 400;
  throw error;
}

function updateCoffee(id, { type, orderedBy }) {
  const coffeeId = COFFEE_LIST.findIndex((coffee) => coffee.id === id);
  if (coffeeId === -1) {
    const error = new Error(`아이디가 '${id}'인 커피를 찾지 못했습니다.`);
    error.statusCode = 400;
    throw error;
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
  const error = new Error(`아이디가 '${id}'인 커피를 찾지 못했습니다.`);
  error.statusCode = 400;
  throw error;
}

module.exports = router;
