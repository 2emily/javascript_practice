let set1 = new Set([1, 2, 2, 3]);
console.log(set1); // Set(3) { 1, 2, 3 }

let set2 = new Set('hello');
console.log(set2); // Set(4) { 'h', 'e', 'l', 'o' }
// 추가
set1.add(1);
console.log(set1);

// 삭제
set1.delete(6);
console.log(set1);

// 전부 삭제
set1.clear();
console.log(set1);

console.log('==============');

console.log(Symbol.iterator in set1); // true

for (const value of set2) {
	console.log(value);
}

console.log([...set2]);

const [a, ...rest] = set2;
console.log(a, rest);

console.log('==============');

let array = [2, 1, 2, 3, 4, 3, 4];

console.log(array);
let uniq1 = (array) => array.filter((v, i) => array.indexOf(v) === i);
console.log(uniq1(array));

let set3 = new Set(array);
console.log('set3 =', set3);

const uniq2 = [...new Set(array)];
console.log(uniq2);

console.log('==============');

// 오브젝트 세트
let pro1 = { name: '공책', price: 3000 };
let pro2 = { name: '펜', price: 1500 };
let proSet = new Set([pro1, pro2]);
console.log(proSet);

pro1.price = 10000;
proSet.add(pro1);
console.log(proSet);

let pro3 = { name: '펜', price: 1500 };
proSet.add(pro3);
console.log(proSet);
pro3.price = 8000;
console.log(proSet);

// 교집합 intersection
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

function findIntersection(set1, set2) {
	return [...set1].filter((item) => set2.has(item));
}
// function findIntersection(set1, set2) {
// 	return new Set([...set1].filter((item) => set2.has(item)));
// }
console.log(findIntersection(setA, setB));

// 차집합 difference

function findDifference(set1, set2) {
	return [...set1].filter((item) => !set2.has(item));
}

console.log(findDifference(setA, setB));
