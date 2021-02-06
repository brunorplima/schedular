import * as actionTypes from '../constants';
import * as api from '../../api/api';

export const createGetEventsAction = () => async (disptach: any) => {
   try {
      const { data } = await api.getEventsApi();
      data.forEach((event:any) => event = new Date(event));

      disptach({ type: actionTypes.GET_EVENTS, payload: data });
   } catch (error) {
      console.error('Error in getEventAcion: ' + error.message);
   }
}