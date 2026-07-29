import type { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
  
  // Um método para gerenciar a rota de CRIAR
  create(req: Request, res: Response) {
    try {
      const { title, description } = req.body;

      const service = new TaskService();
      const tarefa = service.create({ title, description });
      
      return res.status(201).json(tarefa);
      
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
    }
  }
  
  list(req: Request, res: Response) {
    const service = new TaskService();

    const { completed } = req.query;

      let completedConverted: boolean | undefined = undefined;
      if (completed === 'true') {
        completedConverted = true;
      }
      if (completed === 'false') {
        completedConverted = false;
      }

      const tarefa = service.filter(completedConverted);

    return res.status(200).json(tarefa);
  }

  delete(req:Request, res:Response) {
    try {
      const { id } = req.params;

      const service = new TaskService();
      const tarefas = service.delete(Number(id));
      
      return res.status(200).json(tarefas);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
    }
  }

  specific (req: Request, res: Response) {
    try {
      const { id } = req.params;

      const service = new TaskService();
      const tarefa = service.specific(Number(id));
      
      return res.status(200).json(tarefa);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ erro: error.message });
      }
    }
  }

  update (req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const { completed } = req.body;

      const titleConverted = typeof title === 'string' ? title: undefined;
      const completedConverted = typeof completed === 'boolean' ? completed: undefined;

      const service = new TaskService();
      const tarefa = service.update(Number(id), titleConverted, completedConverted);
      
      return res.status(200).json(tarefa);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ erro: error.message });
      }
    }
  }

}
