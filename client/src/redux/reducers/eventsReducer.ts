import { Action, CalendarEvent } from '../../interfaces/interfaces';
import { GET_EVENTS } from '../constants';

const eventsReducer = (events = [], action: Action): CalendarEvent[] => {
   switch (action.type) {
      case GET_EVENTS:
         return action.payload;
      default:
         return events;
   }
}

export default eventsReducer;