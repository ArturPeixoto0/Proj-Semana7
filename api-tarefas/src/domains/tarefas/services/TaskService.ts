import type { Task } from "../models/Task";
import { prisma } from "../../../config/prismaClient";

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
    try {
      await prisma.task.delete({where: {id}});
    
      const ListaDeTarefas = await prisma.task.findMany();
    
      return ListaDeTarefas;
    } catch (error) {
      throw new Error(`Não existe uma tarefa com o ID ${id}`);
    }
  }

  async specific (id:number) {
    const TarefaEspecifica = await prisma.task.findUnique({where: {id}})
    
    if (!TarefaEspecifica){
      throw new Error(`Não existe uma tarefa com o ID ${id}`);
    }
    
    return TarefaEspecifica;
  }

  async update (id:number, title?:string, completed?: boolean) {
    if (title === undefined && completed === undefined) {
        throw new Error(`adicione ao menos um dos campos (Título ou completo)`);
      }
    try {
      let TarefaAtualizada = await prisma.task.update({where: {id}, data: {}})

      if (title !== undefined) {
        TarefaAtualizada = await prisma.task.update({where: {id}, data: {title: title}});
      }
      if (completed !== undefined) {
        TarefaAtualizada = await prisma.task.update({where: {id}, data: {completed: completed}});
      }

      return TarefaAtualizada;
    } catch (error) {
      throw new Error(`Não existe uma tarefa com o ID ${id}`);
    }
  }  

  async filter (completed?: boolean) {
    if (completed === undefined) {
      return await prisma.task.findMany();
    }

    const ListaFiltrada = await prisma.task.findMany({where: {completed: completed}})

    if (ListaFiltrada.length === 0) {
      throw new Error(`Não há nenhuma tarefa que possua tal atributo`);
    }

    return ListaFiltrada;
    }

}
