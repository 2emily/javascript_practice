import is from '@sindresorhus/is';
import { Response, Request, NextFunction } from 'express';
import { ITodo } from '../types/todo';
import { todoService } from '../services';

const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const todos: ITodo[] = await todoService.getTodos();
    res.status(200).json({ todos });
  } catch (error) {
    next(error);
  }
};

const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const { name, description, status } = req.body as Pick<
      ITodo,
      'name' | 'description' | 'status'
    >;

    const newTodo: ITodo | null = await todoService.addTodo({
      name,
      description,
      status,
    });
    const allTodos: ITodo[] = await todoService.getTodos();

    res
      .status(201)
      .json({ message: 'Todo added', todo: newTodo, todos: allTodos });
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const id: string = req.params.id;
    const { name, description, status } = req.body as Pick<
      ITodo,
      'name' | 'description' | 'status'
    >;

    const updateTodo: ITodo | null = await todoService.updateTodo({
      id,
      name,
      description,
      status,
    });

    const allTodos: ITodo[] = await todoService.getTodos();

    res.status(200).json({
      message: 'Todo updated',
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const deletedTodo: ITodo | null = await todoService.deleteTodo(id);
    const allTodos: ITodo[] = await todoService.getTodos();

    res.status(200).json({
      message: 'Todo deleted',
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error) {
    next(error);
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
