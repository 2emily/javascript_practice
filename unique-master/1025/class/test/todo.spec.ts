import request from 'supertest';
import { app } from '../src/app';

describe('Todo List 테스트 코드를 작성해보자.', () => {
  test('getTodos API를 호출하면, 200 응답을 전달한다.', async () => {
    expect(1).toBe(1);
  });

  test('addTodo API를 호출하면, 201 응답을 전달한다.', async () => {
    expect(1).toBe(1);
  });

  test('updateTodo API를 호출하면, 200 응답을 전달한다.', async () => {
    expect(1).toBe(1);
  });

  test('deleteTodo API를 호출하면, 200 응답을 전달한다.', async () => {
    expect(1).toBe(1);
  });
});
