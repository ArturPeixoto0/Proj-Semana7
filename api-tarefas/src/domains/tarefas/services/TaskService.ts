import type { Task } from "../models/Task";
import { prisma } from "../../../config/prismaClient";

let ListaDeTarefas: Task[] = []; 
let id: number = 1;
interface ICriarTarefa {
  title: string;
  description: string;
}

export class TaskService {
  
  async create({ title, description }: ICriarTarefa) {
    
    if (!title) {
      throw new Error("Nome da tarefa é obrigatório");
    }
    
    const novaTarefa = await prisma.task.create( { data: {title: title, description: description} })

    return novaTarefa;
  }

  async delete(id:number){
    if (!id) {
      throw new Error(`Não existe uma tarefa com o ID ${id}`);
    }

    ListaDeTarefas = ListaDeTarefas.filter(c => c.id !== id);
    
    return ListaDeTarefas;
  }

  async specific (id:number) {
    const TarefaEspecifica = ListaDeTarefas.find(t => t.id === id);
    
    if (!TarefaEspecifica){
      throw new Error(`Não existe uma tarefa com o ID ${id}`);
    }
    
    return TarefaEspecifica;
  }

  async update (id:number, title?:string, completed?: boolean) {
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

  async filter (completed?: boolean) {
    if (completed === undefined) {
      return ListaDeTarefas;
    }

    const ListaFiltrada = ListaDeTarefas.filter(c => c.completed === completed);
    if (!ListaFiltrada) {
      throw new Error(`Não há nenhuma tarefa que possua tal atributo`);
    }

    return ListaFiltrada;
  }

}
