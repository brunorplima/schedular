import axios from 'axios';
import {
   UnsavedCalendarEvent,
   UnsavedTask,
   UnsavedReminder,
   UnsavedNote
 } from '../interfaces/interfaces';

const EVENTS_URL = 'http://localhost:5000/events';
const TASKS_URL = 'http://localhost:5000/tasks';
const REMINDERS_URL = 'http://localhost:5000/reminders';
const NOTES_URL = 'http://localhost:5000/notes';

export const getEventsApi = () => axios.get(EVENTS_URL);
export const postEventApi = (newPost: UnsavedCalendarEvent) => axios.post(EVENTS_URL, newPost);


export const getTasksApi = () => axios.get(TASKS_URL);
export const postTaskApi = (newTask: UnsavedTask) => axios.post(TASKS_URL, newTask);


export const getRemindersApi = () => axios.get(REMINDERS_URL);
export const postReminderApi = (newReminder: UnsavedReminder) => axios.post(REMINDERS_URL, newReminder);


export const getNotesApi = () => axios.get(NOTES_URL);
export const postNoteApi = (newNote: UnsavedNote) => axios.post(NOTES_URL, newNote);