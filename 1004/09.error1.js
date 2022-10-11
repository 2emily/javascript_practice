// console.log('시작');

// foo();
// // ReferenceError: foo is not defined
// // 강제 종료

// console.log('끝'); // 실행 못함

try {
	console.log('시작');
	// 실행할 코드(에러 발생 여지가 있는 코드)
	//(1***1); // SyntaxError: Invalid or unexpected token
	//foo(); // ReferenceError: foo is not defined
	//null.foo; // TypeError: Cannot read property 'foo' of null
	//new Array(-1); // RangeError: Invalid array length
	//decodeURIComponent('%'); // URIError: URI malformed
} catch (err) {
	// try 블록에서 에러가 발생하면 이 블록의 코드가 실행
	// 매개변수(이름 자유)에는 try 코드 블록에서 발생한 Error 객체가 전달
	console.error(`에러 발생 : ${err}`);
} finally {
	// 에러 발생과 상관없이 반드시 한 번 실행
	console.log('끝');
}

// try {
// 	// 에러 객체만 생성하면 catch 하지 못함
// 	new Error('Error 발생 1 !');
// 	console.log('테스트');
// } catch (err) {
// 	console.log(err);
// }

// console.log('==끝===');

// try {
// 	// 에러 객체만 생성 후 -> 에러를 던짐(throw)
// 	throw new Error('Error 발생 2 !');
// 	console.log('테스트');
// } catch (err) {
// 	console.log(err);
// }
// console.log('==끝===');
