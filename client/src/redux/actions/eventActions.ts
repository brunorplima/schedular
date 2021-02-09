import * as actionTypes from '../constants';
import * as api from '../../api/api';
import { UnsavedCalendarEvent } from '../../interfaces/interfaces';

export const createGetEventsAction = () => async (disptach: any) => {
   try {
      const { data } = await api.getEventsApi();
      data.forEach((event: any) => event = new Date(event));

      disptach({ type: actionTypes.GET_EVENTS, payload: data });
   } catch (error) {
      console.error('Error in getEventAcion: ' + error.message);
   }
}

export const createPostEventAction = (newPost: UnsavedCalendarEvent) => async (dispatch: any) => {
   try {
      const { data } = await api.postEventApi(newPost);
      dispatch({ type: actionTypes.ADD_EVENTS, payload: data })
   } catch (error) {
      console.error('Error in createPostEventAction: ' + error.message);
   }
}