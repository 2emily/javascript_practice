function a() {
	throw new Error('에러 발생!! ');
}

function b() {
	a();
}

function c() {
	b();
}

try {
	c();
} catch (error) {
	console.log('에러 잡았다!! ');
}
console.log('프로그램 종료 ');
