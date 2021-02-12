import * as api from '../../api/api';
import { Reminder, UnsavedReminder } from '../../interfaces/interfaces';
import { GET_REMINDERS, ADD_REMINDER } from '../constants';

export const createGetRemindersAction = () => async (dispatch: any) => {
   try {
      const { data } = await api.getRemindersApi();
      const reminders = data.map((reminder: Reminder) => {
         reminder.dateTime = new Date(reminder.dateTime);
         return reminder;
      });
      dispatch({ type: GET_REMINDERS, payload: reminders });
   } catch (error) {
      console.error('createGetRemindersAction error: ' + error.message);
   }
}

export const createPostReminderAction = (newReminder: UnsavedReminder) => async (dispatch: any) => {
   try {
      const { data } = await api.postReminderApi(newReminder);
      dispatch({ type: ADD_REMINDER, payload: data });
   } catch (error) {
      console.error('createPostReminderAction error: ' + error.message);
   }
}