import React, { useEffect } from 'react';
import NavBar from './components/navbar/NavBar';
import { useDispatch } from 'react-redux'
import { createGetEventsAction } from './redux/actions/eventActions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CalendarList from './components/calendar-list/CalendarList';
import { createGetTasksAction } from './redux/actions/taskActions';
import { createGetRemindersAction } from './redux/actions/reminderActions';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

   const dispatch = useDispatch();

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
