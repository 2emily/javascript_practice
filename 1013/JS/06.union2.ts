{

  type SuccessState = {
    result: 'success';
    response: {
      body: string;
    };
  };
  type FailState = {
    result: 'fail';
    reason: string;
  };

  type LoginState = SuccessState | FailState;

  function CheckLogin(id: string, pw: string): LoginState {

    if (id == 'test1' && pw == '1111') {
      return {
        result: 'success',
        response: {
          body: '로그인 성공',
        }
      }
    }
    else {
      return {
        result: 'fail',
        reason: '로그인 실패',
      }
    }

  }

  function printState(state: LoginState) {
    if (state.result === 'success') {
      console.log(`${state.response.body}`);
    } else {
      console.log(` ${state.reason}`);
    }
  }
  const myLogin = CheckLogin('test1', '1112');
  printState(myLogin);
}
