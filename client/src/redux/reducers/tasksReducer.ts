import { Action, Task } from '../../interfaces/interfaces';
import { GET_TASKS, ADD_TASK } from '../constants';


const tasksReducer = (tasks = [], action: Action): Task[] => {
   switch(action.type) {
      case GET_TASKS:
         return action.payload;
      case ADD_TASK:
         return [...tasks, action.payload];
      default:
         return tasks;
   }
}

export default tasksReducer;