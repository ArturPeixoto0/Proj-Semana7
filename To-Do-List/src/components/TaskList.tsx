import { getAllTasks, deleteTask, UpdateCompleted } from "../services/taskService";
import { useEffect, useState } from 'react';
import type { Task } from "../types";
import axios from 'axios';

interface refreshKey {
    refreshKey: number;
}

export const TaskList = ({refreshKey}: refreshKey) => {
    const [lista, setLista] = useState<Task[]>([]);    

    useEffect ( () => {
        async function load () {
            try {
               const dados = await getAllTasks();
                setLista(dados);
            }catch (error) {
                if (axios.isAxiosError(error)) {
	                console.error('Erro da API: ', error.response?.data);
	                console.error('Status: ', error.response?.status);
                } else {
                    console.error('Erro inesperado: ', error);
                } 
            }
            finally {
            }
        }
        load();
    }, [refreshKey]);

    async function handleDelete (id: number) {
        await deleteTask(id);
        setLista(prev => prev.filter(c => c.id !== id))
    }

    async function handleComplete (id: number, completed: boolean) {
        await UpdateCompleted(id, completed);
        setLista(prev => prev.map(task => 
            task.id === id ? { ...task, completed: !completed } : task
        ));
    }

    function textoCompletude (completo: boolean): string {
        if (completo === true) {
            return "Concluído!"
        }
        return "Em Progresso..."
    }
    function textoBtnCompleted (completo: boolean): string {
        if (completo === true) {
            return "Iniciar Novamente"
        }
        return "Completar"
    }


    return (
        <div>
            <ul>
                {lista.map ( Task => (
                    <li className="bg-amber-100 m-2 mr-30 ml-30 p-2 border border-black rounded-sm mw-3">
                      <div className="text-center">
                          <h1 className="mb-1">{Task.title}</h1>
                          <h3 className="text-gray-00">{Task.description}</h3>
                      <h2 className={`${Task.completed ? "text-green-800" : "text-red-800"}`}>{textoCompletude(Task.completed)}</h2>
                      </div>
                      <p>ID: {Task.id}</p>
                    <div className="flex">
                      <button onClick={() => handleDelete(Task.id)} 
                      className="bg-red-600 p-1 border border-black rounded-sm">
                        Apagar
                      </button>
                      
                      <button onClick={() => handleComplete(Task.id, Task.completed)} 
                      className={`p-1 border border-black rounded-sm ml-auto ${Task.completed ? "bg-red-500" : "bg-green-500"}`}>
                        {textoBtnCompleted(Task.completed)}
                      </button>
                       </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}