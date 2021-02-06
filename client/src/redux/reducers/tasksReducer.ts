import { Action, Task } from '../../interfaces/interfaces'


const tasksReducer = (tasks = [], action: Action): Task[] => {
   switch(action.type) {

      default:
         return tasks;
   }
}

export default tasksReducer;