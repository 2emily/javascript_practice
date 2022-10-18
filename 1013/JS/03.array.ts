{
  const pets: string[] = ['cat', 'dog'];
  const students: Array<String> = ['kim', 'park', 'lee'];
  const nums: number[] = [1, 2, 3, 4, 5];

  function printNames(names: readonly string[]): void {
    names.forEach(element => console.log(element));
  }

  printNames(pets);
  // printNames(nums);

  console.log("-------------");
  // tuple 
  let cat: [string, number];
  cat = ['나비', 3];

  console.log(cat[0]);
  console.log(cat[1]);

  cat.forEach(element => console.log(element));

  // 타입 추론 
  let [name, age] = cat;
  console.log(name);
  console.log(age);
  // name = 10;

  let greeting = 'hello';

  function print(message = 'hello') {
    console.log(message);
  }
  //print(1);
  print('hello');

  function add1(x: number, y: number) {
    return x + y;
  }

  function add2(x: number, y: number): number {
    return x + y;
  }

  const result = add1(1, 2);

  // 화살표 함수 
  let printMyName = (name: string): string => `제이름은 ${name} 입니다`;
  console.log(printMyName);

}
