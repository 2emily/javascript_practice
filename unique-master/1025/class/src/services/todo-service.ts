import { todoModel, TodoModel } from '../db';
import { ITodo, TodoInfo, TodoInfoById } from '../types/todo';

class TodoService {
  constructor(private todoModel: TodoModel) {}
}

const todoService = new TodoService(todoModel);

export { todoService };
