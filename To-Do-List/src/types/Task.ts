export interface Task {
  	  id: number;     
  	  title: string;  
	  description?: string;
  	  completed: boolean; 
	}

export type CreateTaskData = Omit<Task, 'id' | 'completed'>;