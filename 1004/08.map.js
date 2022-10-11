const map = new Map([
	['cat', '나비'],
	['dog', '바둑이'],
]);
console.log(map);

console.log(map.size);

console.log(map.has('cat'));
console.log(map.has('rabbit'));

// 추가
map.set('rabbit', '토순이');
console.log(map);

map.set('cat', '냐옹이');
console.log(map);

// 삭제
map.delete('cat');
console.log(map);
console.log('===========');
// 순회
map.forEach((value, key) => console.log(key, value));
console.log(map.keys());
console.log(map.values());
console.log(map.entries());
console.log('===========');

// 찾기
console.log(map.get('rabbit'));
console.log(map.get('tiger'));

// 전부삭제
map.clear();
console.log(map);
console.log('===========');

const errorMsgObj = {
	404: '페이지가 없습니다',
	500: '서버 오류입니다',
	401: '권한이 없습니다',
};

console.log(errorMsgObj['404']);
// console.log(errorMsgObj.404)

const errorMsgMap = new Map([
	[404, '페이지가 없습니다'],
	[500, '서버 오류입니다'],
	[401, '권한이 없습니다'],
]);

errorMsgMap.get(404);
//console.log(errorMsgMap['404']); //undefined

console.log(Symbol.iterator in errorMsgObj);
console.log(Symbol.iterator in errorMsgMap);

console.log('===========');
for (const [key, value] of errorMsgMap) {
	console.log(key, value);
}

console.log('===========');

// for in문 이용
for (key in errorMsgObj) {
	console.log(key, errorMsgObj[key]);
}
console.log('===========');
// Object.keys() 이용
for (key of Object.keys(errorMsgObj)) {
	console.log(key, errorMsgObj[key]);
}
console.log('===========');
