import axios from 'axios';

const URL = 'http://localhost:5000'

 export const getEventsApi = () => axios.get(`${URL}/events`);