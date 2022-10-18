{

  // function addNum1(num1, num2) {
  //   return num1 + num2;
  // }

  function addNum2(num1: number, num2: number): number {
    return num1 + num2;
  }

  // function fetchId1(id) {
  //   return new Promise((resolve, reject) => {
  //     resolve(1234);
  //   });
  // }

  function fetchId2(id: string): Promise<number> {
    return new Promise((resolve, reject) => {
      resolve(1234);
    });
  }

  function printName1(firstName: string, lastName: string) {
    console.log(firstName);
    console.log(lastName);
  }

  printName1('yeonmi', 'park');
  //printName1('박연미');

  function printName2(firstName: string, lastName: string | undefined) {
    console.log(firstName);
    console.log(lastName);
  }
  printName2('yeonmi', 'park');
  printName2('박연미', undefined);
  function printMessage(message: string = 'default message') {
    console.log(message);
  }
  printMessage();


  function addNumbers(...numbers: number[]): number {
    return numbers.reduce((a, b) => a + b);
  }
  console.log(addNumbers(1, 2));
  console.log(addNumbers(1, 2, 3, 4));
  console.log(addNumbers(1, 2, 3, 4, 5, 6));




}

