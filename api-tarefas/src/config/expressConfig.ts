import express from 'express';
import cors from 'cors';
import { taskRoutes } from '../routes/tasks-routes';  

const app = express();
app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use('/tasks', taskRoutes);

export { app };