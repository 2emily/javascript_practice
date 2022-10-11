class User {
	constructor(id, password) {
		this.id = id;
		this.password = password;
	}
	findById(id, pw, callback) {
		if (id === this.id) {
			callback(null, { dbPW: this.password, inputPW: pw });
		} else {
			callback(null, null);
		}
	}
}

function checkLogin(err, user) {
	if (err) {
		throw err;
	}
	if (!user) {
		const err = new Error('해당 아이디는 존재 하지 않습니다');
		err.name = 'NotExistIdError';
		throw err;
	}
	console.log(user.dbPW);
	console.log(user.inputPW);

	if (user.dbPW === user.inputPW) {
		console.log('로그인 성공');
		return true;
	} else {
		const err = new Error('비밀번호 일치 하지 않습니다');
		err.name = 'NotMatchPasswordError';
		throw err;
	}
}

function findUser(user, id, pw) {
	if (user instanceof User) {
		user.findById(id, pw, checkLogin);
	} else {
		checkLogin(new Error('유저 객체가 아니다'));
	}
}

try {
	const admin = new User('admin', '1234');
	findUser(admin, 'admin', '2345');
	//findUser(admin, 'test1', '1234');

	//findUser(admin, 'admin', '1234');
	//findUser('test');
} catch (e) {
	if (e.name === 'NotExistIdError') {
		console.log('회원이 없을 때 에러를 처리');
	} else if (e.name === 'NotMatchPasswordError') {
		console.log('비밀번호틀렸을 때 에러를 처리');
	} else {
		console.log('기타 에러', e);
	}
}
