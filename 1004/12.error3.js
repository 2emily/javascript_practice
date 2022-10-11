// 자바스크립트 엔진구조
// http://jaynewho.com/post/25

// function execute() {
// 	console.log('1');
// 	setTimeout(() => {
// 		console.log('2');
// 	}, 2000);
// 	console.log('3');
// }
// execute();

function runInDelay(callback, seconds) {
	if (!callback) {
		throw new Error('callback 함수가 아니다 ');
	}
	if (!seconds || seconds < 0) {
		throw new Error('0 보다 큰 ms초 단위가 들어와야한다');
	}
	setTimeout(callback, seconds * 1000);
}

try {
	runInDelay(() => {
		console.log('타이머 종료');
	}, 2);
} catch (error) {
	console.log(error);
}
