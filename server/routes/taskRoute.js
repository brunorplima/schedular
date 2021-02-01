import express from 'express';
import { 
   addTask,
   deleteTask,
   getTask,
   getTasks,
   updateTask
} from '../controllers/tasks.js';

const taskRoute = express.Router();

taskRoute.get('/', getTasks);
taskRoute.get('/:id', getTask);
taskRoute.post('/', addTask);
taskRoute.patch('/:id', updateTask);
taskRoute.delete('/:id', deleteTask);

export default taskRoute;