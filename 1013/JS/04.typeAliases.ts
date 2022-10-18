{

  type Num = number;
  type bool = boolean;
  let age: Num = 10;
  //age = 'a';
  let isNumber: bool = true;
  //isNumber = 't';


  type Student = {
    name: string;
    age: number;
  };

  const student: Student = {
    name: '홍길동',
    age: 35
  };


  function changeName(obj: Student, newName = '박연미') {
    obj.name = newName;
    console.log(obj);
  }
  changeName(student);
  changeName({ name: '홍길동', age: 3 }, '아이유');
  //changeName({ name: '홍길동', job:'학생' });


  type NAME = 'name';
  let catName: NAME;
  catName = 'name';
  //catName = '이름';

  type CODE = 1;
  let exit: CODE;
  //exit = 2;
  type JSON = 'json';
  const json: JSON = 'json';


}