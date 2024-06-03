import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import SurveyComponent from './components/SurveyComponent';
import EventList from './components/EventList';
import EventDateList from './components/EventDateList';
import TicketList from './components/TicketList';
import TicketDetail from './components/TicketDetail';
import PersonDetail from './components/PersonDetail';
//import SurveyResponseList from './components/SurveyResponseList';
//import SurveyResponseDetail from './components/SurveyResponseDetail';


function App() {

  //Falta agregar PersonList a las rutas
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SurveyComponent />} />;
        <Route path='/admin/events' Component={EventList} />
        <Route path='/admin/events/:eventId/event_dates_list' Component={EventDateList} />
        <Route path='/admin/events/:eventDateId/ticket_list' Component={TicketList} />
        <Route path='/admin/events/:eventDateId/ticket/:ticketDetailId' Component={TicketDetail} />
        <Route path='/admin/person/:personId' Component={PersonDetail} />
      </Routes>
    </Router>
  );
}

export default App;
