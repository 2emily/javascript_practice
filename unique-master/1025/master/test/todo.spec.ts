import request from 'supertest';
import { app } from '../src/app';

describe('Todo List 테스트 코드를 작성해보자.', () => {
  test('getTodos API를 호출하면, 200 응답을 전달한다.', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.statusCode).toBe(200);
  });

  test('addTodo API를 호출하면, 201 응답을 전달한다.', async () => {
    const dto = {
      name: '테스트',
      description: '설명',
      status: false,
    };
    const response = await request(app).post('/api/todos').send(dto);
    expect(response.statusCode).toBe(201);
  });

  test('updateTodo API를 호출하면, 200 응답을 전달한다.', async () => {
    const dto = {
      name: '테스트',
      description: '설명',
      status: false,
    };

    const response = await request(app)
      .post('/api/todos')
      .send(dto)
      .expect(201);
    const responseBody = response.body;
    const responseId = responseBody['todo']._id;

    const updateDto = {
      name: '테스트1',
      description: '설명1',
      status: false,
    };

    const sut = await request(app)
      .put('/api/todos/' + responseId)
      .send(updateDto);
    expect(sut.statusCode).toBe(200);
  });

  test('deleteTodo API를 호출하면, 200 응답을 전달한다.', async () => {
    const dto = {
      name: '테스트',
      description: '설명',
      status: false,
    };

    const response = await request(app)
      .post('/api/todos')
      .send(dto)
      .expect(201);
    const responseBody = response.body;
    const responseId = responseBody['todo']._id;

    const sut = await request(app).delete('/api/todos/' + responseId);
    expect(sut.statusCode).toBe(200);
  });
});
