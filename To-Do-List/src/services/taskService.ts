import { api } from './api';
import type { Task } from '../types';
import type { CreateTaskData } from '../types'

export async function getAllTasks(): Promise<Task[]> {
  const response = await api.get<Task[]>('/task');
  return response.data;
} 

export async function createTask( data: CreateTaskData): Promise<Task> {
  const response = await api.post<Task>('/task', data);
  return response.data;
} 

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/task/${id}`);
} 
