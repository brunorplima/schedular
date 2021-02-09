import { Action, CalendarEvent } from '../../interfaces/interfaces';
import { ADD_EVENTS, GET_EVENTS } from '../constants';

const eventsReducer = (events = [], action: Action): CalendarEvent[] => {
   switch (action.type) {
      case GET_EVENTS:
         return action.payload;
      case ADD_EVENTS:
         return [...events, action.payload];
      default:
         return events;
   }
}

export default eventsReducer;