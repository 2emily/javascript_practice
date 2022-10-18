{

  type Animal = {
    name: string;
    age: number;
  };

  type Pet = {
    ownerName: string;
  };


  function getInfo(cat: Animal & Pet) {
    console.log(cat.name, cat.age, cat.ownerName);
  }

  const nabi: Animal & Pet = {
    name: "나비",
    age: 14,
    ownerName: '홍길동',
  }

  getInfo(nabi);

}
