import type { Task } from "../models/Task";

let ListaDeTarefas: Task[] = []; 
let id: number = 1;
interface ICriarTarefa {
  title: string;
  description: string;
}

export class TaskService {
  
  create({ title, description }: ICriarTarefa) {
    
    if (!title) {
      throw new Error("Nome da tarefa é obrigatório");
    }
    
    const novaTarefa: Task = { id: id++, title: title, description: description, completed: false };
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

  specific (id:number) {
    const TarefaEspecifica = ListaDeTarefas.find(t => t.id === id);
    
    if (!TarefaEspecifica){
      throw new Error(`Não existe uma tarefa com o ID ${id}`);
    }
    
    return TarefaEspecifica;
  }

  update (id:number, title?:string, completed?: boolean) {
    const TarefaAtualizada = ListaDeTarefas.find(t => t.id === id);
    if (!TarefaAtualizada) {
      throw new Error(`Não existe uma tarefa com o ID ${id}`);
    }

    if (title !== undefined) {
      TarefaAtualizada.title = title;
    }
    if (completed !== undefined) {
      TarefaAtualizada.completed = completed;
    }
    if (title === undefined && completed === undefined) {
      throw new Error(`adicione ao menos um dos campos (Título ou completo)`);
    }

    ListaDeTarefas[ListaDeTarefas.findIndex(t => t.id === id)] = TarefaAtualizada;

    return TarefaAtualizada;
  }  

}
