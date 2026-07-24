
import { createTask } from "../services/taskService";
import { useState } from "react";
import axios from "axios";

interface refreshKey {
   refreshKey() : void,
}

export function AddTask ( {refreshKey}: refreshKey) {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
   
    const [carregando, setCarregando] = useState(false)

    const [textoErro, setTextoErro] = useState("");

    async function handleClick() {
        try {
            setCarregando(true);

        const NovaTarefa = {
            title: titulo,
            description: descricao,
        }

        await createTask(NovaTarefa)

        refreshKey();

        setTextoErro("")
        setTitulo("");
        setDescricao("");

        } catch (error) {
            if (axios.isAxiosError(error)) {
	            console.error('Erro da API: ', error.response?.data);
	            console.error('Status: ', error.response?.status);
            } else {
                console.error('Erro inesperado: ', error);
            }
        } finally {
            setCarregando(false);
        }
    }

    if (carregando) {
      return (
         <div className="flex justify-center items-center p-8">
            <p className="text-amber-100 text-xl font-semibold animate-pulse">
               Carregando...
            </p>
         </div>
      );
   }

    return (
        <div>
            <div className="flex justify-center">
                <div className="m-2 grid grid-cols-1">

                    <input type="text" 
                    value={ titulo }
                    onChange ={(e)=> setTitulo(e.target.value)}
                    placeholder="Título" 
                    className="bg-amber-50 border border-black rounded-sm mb-2" />

                    <input type="text" 
                    value={ descricao }
                    onChange ={(e)=> setDescricao(e.target.value)}
                    placeholder="Descrição" 
                    className="bg-amber-50 border border-black rounded-sm mb-2" />

                    <button onClick={handleClick} 
                        className="bg-amber-100 text-black m-1 p-1 border scale-100 hover:scale-110 cursor-pointer rounded-sm place-self-center">
                        Salvar
                    </button>
                </div>
            </div>
            <h2 className="text-amber-100 flex items-center justify-center">{textoErro}</h2>
        </div>
    );
}