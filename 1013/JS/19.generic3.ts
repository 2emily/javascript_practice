interface Employee {
  pay(): void;
}

class FullTimeEmployee implements Employee {
  pay() {
    console.log(`full time!!`);
  }
  workFullTime() { }
}

class PartTimeEmployee implements Employee {
  pay() {
    console.log(`part time!!`);
  }
  workPartTime() { }
}

function pay1(employee: Employee): Employee {
  employee.pay();
  return employee;
}

function pay2<T extends Employee>(employee: T): T {
  employee.pay();
  return employee;
}

const kim = new FullTimeEmployee();
const bob = new PartTimeEmployee();
kim.workFullTime();
bob.workPartTime();

const afterPayKim = pay1(kim);
afterPayKim.pay;
const afterPayBob = pay2(bob);


const person = {
  name: '박연미',
  age: 30,
};

const dog = {
  kind: '진돗개',
  name: '누렁이'
};

function getValue1<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

console.log(getValue1(person, 'name'));
console.log(getValue1(dog, 'kind'));