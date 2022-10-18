import { Document } from 'mongoose';

export interface ITodo extends Document {
  name: string;
  description: string;
  status: boolean;
}

export interface TodoInfo {
  name: string;
  description: string;
  status: boolean;
}

export interface TodoInfoById extends TodoInfo {
  id: string;
}
