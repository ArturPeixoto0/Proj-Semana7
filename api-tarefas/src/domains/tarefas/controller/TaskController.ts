import type { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
  
  // Um método para gerenciar a rota de CRIAR
  create(req: Request, res: Response) {
    try {
      const { nome, descricao } = req.body;

      const service = new TaskService();
      const tarefa = service.create({ nome, descricao });
      
      return res.status(201).json(tarefa);
      
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
    }
  }
  
  list(req: Request, res: Response) {
    const service = new TaskService();
    const tarefas = service.list();
    return res.status(200).json(tarefas);
  }

  delete(req:Request, res:Response) {
    try {
      const { id } = req.query;

      const service = new TaskService();
      const tarefas = service.delete(Number(id));
      
      return res.status(200).json(tarefas);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
    }
  }
}
