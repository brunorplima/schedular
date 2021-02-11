import React, { useEffect } from 'react';
import NavBar from './components/navbar/NavBar';
import { useStore, useDispatch } from 'react-redux'
import { createGetEventsAction } from './redux/actions/eventActions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CalendarList from './components/calendar-list/CalendarList';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createGetTasksAction } from './redux/actions/taskActions';
import { createGetRemindersAction } from './redux/actions/reminderActions';

function App() {

   const store = useStore();
   const dispatch = useDispatch();
   console.log(store.getState().events);

   store.subscribe(() => {
      console.log(store.getState().events)
   })

   useEffect(() => {
      dispatch(createGetEventsAction());
      dispatch(createGetTasksAction());
      dispatch(createGetRemindersAction());
   }, [dispatch])


   return (
      <div className="App">
         <NavBar />

         <Router>
            <Switch>
               <Route path='/calendar-list'>
                  <CalendarList />
               </Route>
            </Switch>
         </Router>
      </div>
   );
}

export default App;
