

interface Either<L, R> {
  left: () => L;
  right: () => R;
}


class SimpleEither<L, R> implements Either<L, R> {
  constructor(private leftValue: L, private rightValue: R) { }
  left(): L {
    return this.leftValue;
  }

  right(): R {
    return this.rightValue;
  }
}
const either: Either<number, number> = new SimpleEither(4, 5);
either.left(); // 4
either.right(); //5
const test1 = new SimpleEither({ name: '멍멍이' }, '고양이');
console.log(test1);
const test2 = new SimpleEither(404, 'error');
console.log(test2.left());