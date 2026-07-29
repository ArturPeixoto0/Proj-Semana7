import { TaskList } from '../components/TaskList'; 
import { AddTask } from '../components/AddTask'; 
import { useState } from 'react';

export function TaskPage () {
    const [refreshKey, setRefreshKey] = useState(0);

    return(
        <div>

            <AddTask refreshKey={() => setRefreshKey(prev=>prev+1)}/>
            <TaskList refreshKey={refreshKey}/>
        </div> 
    );
}