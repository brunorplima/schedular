import axios from 'axios';
import { UnsavedCalendarEvent } from '../interfaces/interfaces';

const URL = 'http://localhost:5000/events';

 export const getEventsApi = () => axios.get(URL);
 export const postEventApi = (newPost: UnsavedCalendarEvent) => axios.post(URL, newPost);