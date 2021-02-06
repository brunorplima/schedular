import { Action, Reminder } from '../../interfaces/interfaces';

const remindersReducer = (reminders = [], action: Action): Reminder[] => {
   switch (action.type) {

      default:
         return reminders;
   }
}

export default remindersReducer;