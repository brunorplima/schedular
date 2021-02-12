import * as api from '../../api/api';
import { Task, UnsavedTask } from '../../interfaces/interfaces';
import { ADD_TASK, GET_TASKS } from '../constants'

export const createGetTasksAction = () => async (dispatch: any) => {
   try {
      const { data } = await api.getTasksApi();
      const tasks = data.map((task: Task) => {
         task.dateTime = new Date(task.dateTime);
         return task
      })
      dispatch({ type: GET_TASKS, payload: tasks });
   } catch (error) {
      console.error('createGetTasksAction error: ' + error.message);
   }
}

export const createPostTaskAction = (newTask: UnsavedTask) => async (dispatch: any) => {
   try {
      const { data } = await api.postTaskApi(newTask);
      dispatch({ type: ADD_TASK, payload: data })
   } catch (error) {
      console.error('createPostTaskAction error: ' + error.message);
   }
}