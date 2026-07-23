import { Router } from 'express';
import { TarefaController } from '../domains/tarefas/controller/TarefaController';

const tarefaRoutes = Router(); 
const controller = new TarefaController();

tarefaRoutes.post('/', controller.create);

tarefaRoutes.get('/', controller.list);

tarefaRoutes.delete('/', controller.delete);
// ...e assim por diante para PUT, DELETE, etc.

export { tarefaRoutes };




