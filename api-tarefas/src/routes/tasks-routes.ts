import { Router } from 'express';
import { TaskController } from '../domains/tarefas/controller/TaskController';

const taskRoutes = Router(); 
const controller = new TaskController();

taskRoutes.post('/', controller.create);

taskRoutes.get('/', controller.list);

taskRoutes.delete('/', controller.delete);

export { taskRoutes };




