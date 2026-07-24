import { api } from './api';
import type { Tarefa } from '../types';
import type { CreateTarefaData } from '../types'

export async function getAllTarefas(): Promise<Tarefa[]> {
  const response = await api.get<Tarefa[]>('/tarefas');
  return response.data;
} 

export async function createTarefa( data: CreateTarefaData): Promise<Tarefa> {
  const response = await api.post<Tarefa>('/tarefas', data);
  return response.data;
} 

export async function deleteTarefa(id: number): Promise<void> {
  await api.delete(`/tarefas/${id}`);
} 
