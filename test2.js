function* generatorFunc() {
	yield 1;
	yield 2;
	yield 3;
}

const generator = generatorFunc();

console.log(generator);