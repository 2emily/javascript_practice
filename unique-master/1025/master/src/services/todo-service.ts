import { todoModel, TodoModel } from '../db';
import { ITodo, TodoInfo, TodoInfoById } from '../types/todo';

class TodoService {
  constructor(private todoModel: TodoModel) {}

  async getTodos(): Promise<ITodo[]> {
    const model = this.todoModel.findAll();
    return model;
  }

  async addTodo(userInfo: TodoInfo): Promise<ITodo> {
    const model = this.todoModel.create(userInfo);
    return model;
  }

  async updateTodo(userInfo: TodoInfoById): Promise<ITodo | null> {
    const model = this.todoModel.update(userInfo);
    return model;
  }

  async deleteTodo(id: string): Promise<ITodo | null> {
    const model = this.todoModel.delete(id);
    return model;
  }
}

const todoService = new TodoService(todoModel);

export { todoService };
