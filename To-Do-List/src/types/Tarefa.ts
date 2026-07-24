export interface Tarefa {
  	  id: number;     
  	  title: string;  
	  description?: string;
  	  completed: boolean; 
	}

export type CreateTarefaData = Omit<Tarefa, 'id' | 'completed'>;