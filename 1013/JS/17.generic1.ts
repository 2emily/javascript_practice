{
  function checkNotNull1(arg: number | null): number {
    if (arg == null) {
      throw new Error('유효하지 않는 숫자값 ');
    }
    return arg;
  }

  function checkNotNull2(arg: any | null): any {
    if (arg == null) {
      throw new Error('유효하지 않는 숫자값 ');
    }
    return arg;
  }


  let result = checkNotNull1(123);
  result = 100;


  function checkNotNull3<T>(arg: T | null): T {
    if (arg == null) {
      throw new Error('유효하지 않는 숫자값');
    }
    return arg;
  }
  let number = checkNotNull3(123);
  //number = 'dsf';
  const boal: boolean = checkNotNull3(true);
}
