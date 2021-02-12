import * as actionTypes from '../constants';
import * as api from '../../api/api';
import { CalendarEvent, UnsavedCalendarEvent } from '../../interfaces/interfaces';

export const createGetEventsAction = () => async (disptach: any) => {
   try {
      const { data } = await api.getEventsApi();
      const events = data.map((event: CalendarEvent) => {
         event.dateTime = new Date(event.dateTime);
         return event;
      })

      disptach({ type: actionTypes.GET_EVENTS, payload: events });
   } catch (error) {
      console.error('Error in getEventAcion: ' + error.message);
   }
}

export const createPostEventAction = (newPost: UnsavedCalendarEvent) => async (dispatch: any) => {
   try {
      const { data } = await api.postEventApi(newPost);
      dispatch({ type: actionTypes.ADD_EVENT, payload: data })
   } catch (error) {
      console.error('Error in createPostEventAction: ' + error.message);
   }
}