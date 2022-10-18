import { ITodo, TodoInfo, TodoInfoById } from '../../types/todo';
import Todo from '../schemas/todo-schema';

export class TodoModel {
  async create(userInfo: TodoInfo): Promise<ITodo> {
    const createdTodo = await Todo.create(userInfo);
    return createdTodo;
  }

  async findAll(): Promise<ITodo[]> {
    const todos: ITodo[] = await Todo.find({});
    return todos;
  }

  async update(userInfo: TodoInfoById): Promise<ITodo | null> {
    const filter = { _id: userInfo.id };
    const updatedUser = await Todo.findByIdAndUpdate(filter, userInfo);
    return updatedUser;
  }

  async delete(id: string): Promise<ITodo | null> {
    const filter = { _id: id };
    const result = await Todo.findByIdAndRemove(filter);
    return result;
  }
}

const todoModel = new TodoModel();

export { todoModel };
