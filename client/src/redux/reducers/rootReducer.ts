import { Action, combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import tasksReducer from './tasksReducer';
import remindersReducer from './remindersReducer';
import notesReducer from './notesReducer';

const months = (state: any, action: Action) => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const rootReducer = combineReducers({
   months,
   events: eventsReducer,
   tasks: tasksReducer,
   reminders: remindersReducer,
   notes: notesReducer
})

export default rootReducer;