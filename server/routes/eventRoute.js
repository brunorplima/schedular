import express from 'express';
import { 
   getEvents,
   addEvent,
   getEvent,
   updateEvent,
   deleteEvent
} from '../controllers/events.js'

const eventRoute = express.Router();

eventRoute.get('/', getEvents);
eventRoute.get('/:id', getEvent);
eventRoute.post('/', addEvent);
eventRoute.patch('/:id', updateEvent);
eventRoute.delete('/:id', deleteEvent);


export default eventRoute;