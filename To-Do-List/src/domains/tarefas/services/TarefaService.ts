import type { Tarefa } from "../models/Tarefa";

let ListaDeTarefas: Tarefa[] = []; 

interface ICriarTarefa {
  nome: string;
  descricao: string;
}

export class TarefaService {
  
  create({ nome, descricao }: ICriarTarefa) {
    
    if (!nome) {
      throw new Error("Nome da tarefa é obrigatório");
    }
    
    const novaTarefa: Tarefa = { id: Math.random(), titulo: nome, descricao: descricao, concluida: false };
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
