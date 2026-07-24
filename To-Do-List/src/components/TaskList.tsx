import { getAllTasks, deleteTask } from "../services/taskService";
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

    function textoCompletude (completo: boolean): string {
        if (completo === true) {
            return "Concluído!"
        }
        return "Em Progresso..."
    }

    return (
        <div>
            <ul>
                {lista.map ( Task => (
                    <li>
                      <div>
                          <h1>{Task.title}</h1>
                          <h3>{Task.description}</h3>
                      </div>
                      <h2>{textoCompletude(Task.completed)}</h2>
                      <p>{Task.id}</p>

                      <button onClick={() => handleDelete(Task.id)} 
                      className="bg-red-600 border border-black rounded-sm">
                        Apagar
                      </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}