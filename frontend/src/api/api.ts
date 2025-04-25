import axios from 'axios';

import { API_ROUTES } from './api.routes';

export interface TaskInterface {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

export const getTasks = async (): Promise<TaskInterface[]> => {
  const response = await axios.get<TaskInterface[]>(API_ROUTES.TASK.BASE);
  return response.data;
};

export const createTask = async (title: string): Promise<TaskInterface> => {
  const response = await axios.post<TaskInterface>(API_ROUTES.TASK.BASE, { title });
  return response.data;
};

export const toggleTask = async (id: number): Promise<TaskInterface> => {
  const response = await axios.patch<TaskInterface>(API_ROUTES.TASK.TOGGLE_COMPLETED(id));
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(API_ROUTES.TASK.DELETE(id));
};
