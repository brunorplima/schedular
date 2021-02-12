import { Action, Reminder } from '../../interfaces/interfaces';
import { GET_REMINDERS, ADD_REMINDER } from '../constants';

const remindersReducer = (reminders = [], action: Action): Reminder[] => {
   switch (action.type) {
      case GET_REMINDERS:
         return action.payload;
      case ADD_REMINDER:
         return [...reminders, action.payload];
      default:
         return reminders;
   }
}

export default remindersReducer;