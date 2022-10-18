import { Router } from 'express';
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todo-controller';

const todoRouter: Router = Router();

todoRouter.get('/todos', getTodos);
todoRouter.post('/todos', addTodo);
todoRouter.put('/todos/:id', updateTodo);
todoRouter.delete('/todos/:id', deleteTodo);

export { todoRouter };
