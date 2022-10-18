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
  } catch (error) {
    next(error);
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
