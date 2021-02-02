import express from 'express';
import { 
   addReminder,
   deleteReminder,
   getReminder,
   getReminders,
   updateReminder
} from '../controllers/reminders.js';

const reminderRoute = express.Router();

reminderRoute.get('/', getReminders);
reminderRoute.get('/:id', getReminder);
reminderRoute.post('/', addReminder);
reminderRoute.patch('/:id', updateReminder);
reminderRoute.delete('/:id', deleteReminder);

export default reminderRoute;