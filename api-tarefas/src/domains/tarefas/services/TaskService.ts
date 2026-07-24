import type { Task } from "../models/Task";

let ListaDeTarefas: Task[] = []; 

interface ICriarTarefa {
  nome: string;
  descricao: string;
}

export class TaskService {
  
  create({ nome, descricao }: ICriarTarefa) {
    
    if (!nome) {
      throw new Error("Nome da tarefa é obrigatório");
    }
    
    const novaTarefa: Task = { id: Math.random(), title: nome, description: descricao, completed: false };
    ListaDeTarefas.push(novaTarefa);
    
    return novaTarefa;
  }
  
  list() {
    return ListaDeTarefas;
  }

  delete(id:number){
    if (!id) {
      throw new Error(`Não existe uma tarefa com o ID ${id}`);
    }

    ListaDeTarefas = ListaDeTarefas.filter(c => c.id !== id);
    return ListaDeTarefas;
  }
}
