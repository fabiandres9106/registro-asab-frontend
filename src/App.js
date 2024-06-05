import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SurveyComponent from './components/SurveyComponent';
import EventList from './components/EventList';
import EventDateList from './components/EventDateList';
import TicketList from './components/TicketList';
import TicketDetail from './components/TicketDetail';
import PersonDetail from './components/PersonDetail';
import Login from './components/Login';
import Unauthorized from './components/Unauthorized';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

import AdminLayout from './components/AdminLayout';
import Content from './components/Content'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<SurveyComponent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/events" element={<EventList />} />  {/* Ruta no protegida */}
          <Route path="/admin" element={<PrivateRoute roles={['admin', 'produccion', 'logistica']} />}>
            <Route path="" element={<AdminLayout />}>
              <Route path="" element={<Content />}>
                <Route path="events" element={<EventList />} />
                <Route path="events/:eventId/event_dates_list" element={<EventDateList />} />
                <Route path="events/:eventDateId/ticket_list" element={<TicketList />} />
                <Route path="events/:eventDateId/ticket/:ticketDetailId" element={<TicketDetail />} />
                <Route path="person/:personId" element={<PersonDetail />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
