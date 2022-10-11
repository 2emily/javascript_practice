const symbol = Symbol('yeonmi');
console.log(typeof symbol);
console.log(symbol);

const key1 = 'key';
const key2 = 'key';

const key3 = Symbol('key');
const key4 = Symbol('key');

console.log(key1 === key2);
console.log(key3 === key4);
console.log(key3.description === key4.description);

console.log('=============');

const map = new Map();
map.set(key1, 'hi');
map.set(key3, 'Hello');

console.log(map.get(key2));
console.log(map.get('key'));
console.log(map.get(key4));
console.log('=============');

// 전역 심벌 레지스트리 (Global Symbol Registry) :

const k1 = Symbol.for('key');
const k2 = Symbol.for('key');
console.log(k1 === k2);

console.log('Symbol =', Symbol.keyFor(k1));

console.log('=============');

const obj = {};
const sym = Symbol();
obj[sym] = '심볼키의 값 ';
obj.propKey = '일반 키의 값 ';

console.log(obj);

console.log(obj[sym]);

console.log(obj.sym);

console.log(obj[Symbol()]);

console.log(sym in obj);

console.log(Object.keys(obj));

console.log(Object.getOwnPropertySymbols(obj));

console.log(Reflect.ownKeys(obj));

function idFunc1(obj) {
	obj.id = 0;
}

const libId = Symbol('id');

function idFunc2(obj) {
	obj[libId] = 0;
}

console.log('============');

let obj1 = { id: 1234 };
let obj2 = { id: 1111 };

idFunc1(obj1);
idFunc2(obj2);
console.log(obj1);
console.log(obj2);

console.log('============');
