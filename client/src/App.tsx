import React, { useEffect } from 'react';
import NavBar from './components/navbar/NavBar';
import { useStore, useDispatch } from 'react-redux'
import { createGetEventsAction } from './redux/actions/eventActions';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

   const store = useStore();
   const dispatch = useDispatch();
   console.log(store.getState().events);

   store.subscribe(() => {
      console.log(store.getState().events)
   })

   useEffect(() => {
      dispatch(createGetEventsAction());
   }, [])


   return (
      <div className="App">
         <NavBar />

      </div>
   );
}

export default App;
