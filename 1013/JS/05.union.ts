{

  type Direction = 'left' | 'right' | 'up' | 'down';
  function move(direction: Direction) {
    console.log(direction);
  }
  move('right');

  type btnSize = 8 | 16 | 32;
  const loginBtn: btnSize = 16;

  //const logoutBtn : btnSize = 23;


  type SuccessState = {
    response: {
      body: string;
    };
  };
  type FailState = {
    reason: string;
  };


  function login(id: string, pw: string): SuccessState | FailState {

    if (id == 'test1' && pw == '1111') {
      return {
        response: {
          body: '로그인 성공',
        }
      }
    } else {
      return {
        reason: '로그인 실패'
      }
    }

  }

  const myLogin = login('test1', '1112');

  function printState(state: SuccessState | FailState) {
    if ('response' in state) {
      console.log(` ${state.response.body}`);
    } else {
      console.log(` ${state.reason}`);
    }
  }

  printState(myLogin);



}
