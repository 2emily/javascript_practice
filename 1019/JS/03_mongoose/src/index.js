const mongoose = require("mongoose");
const sampleCoffees = require("../sample.json");

async function main() {
  await mongoose.connect(
    `mongodb+srv://oneitwoh-db-user:${process.env.MONGO_DB_PW}@oneitwoh-mongo-cluster0.fyhr1ce.mongodb.net/Cafe?retryWrites=true&w=majority`
  );

  const coffeeSchema = new mongoose.Schema({
    type: String,
    orderedBy: String,
    price: Number,
  }, {
    collection: 'Coffee' // 주의 collection 이름을 명시하지 않으면 아래 mongoose.model의 첫 번째 인자로 전달된 값을 복수형으로 해서 사용한다.
  });

  const Coffee = new mongoose.model("Coffee", coffeeSchema);

  // 새로운 커피 생성 - Create
  const newCoffee = new Coffee({
    type: "americano",
    orderedBy: "John Doe",
    price: 1000,
  });
  await newCoffee.save(); // save는 collection에 document를 insert하기 전에 데이터가 스키마에 맞게 구성되어있는 지 검증을 진행한다.

  // 다른 방법의 새로운 커피 생성 – Create
  await Coffee.create(sampleCoffees);

  // 모든 커피를 가져오기 - Read
  const allCoffees = await Coffee.find();
  console.log("# 모든 커피 출력");
  console.log(allCoffees);

  // 10,000원 이상의 커피를 찾아오기
  const expensiveCoffees = await Coffee.find({ price: { $gt: 5000 } });
  console.log("# 비싼 커피 출력");
  console.log(expensiveCoffees);

  // 하나의 커피를 업데이트 – Update
  await Coffee.updateOne(
    { orderedBy: "Clyde Schmitt" },
    { orderedBy: "Max Doe" }
  );
  console.log(
    "# 업데이트 후 커피들: orderedBy(Clyde Schmitt) => orderedBy(Max Doe)"
  );
  console.log(await Coffee.find());

  // 다수의 커피를 업데이트 – Update
  await Coffee.updateMany({ type: "americano" }, { type: "drip coffee" });
  console.log("# 업데이트 후 커피들 : type(americano) => type(drip coffee)");
  console.log(await Coffee.find());

  // 다수의 커피를 삭제 – Delete
  await Coffee.deleteMany({ type: "drip coffee" });
  console.log("# 삭제 후 커피들");
  console.log(await Coffee.find());

  process.exit(0);
}

main();
