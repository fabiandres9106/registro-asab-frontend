import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import SurveyComponent from './components/SurveyComponent';
import FunctionList from './components/FunctionList';
import SurveyResponseList from './components/SurveyResponseList';
import SurveyResponseDetail from './components/SurveyResponseDetail';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SurveyComponent />} />;
        <Route path='/admin/functions/:functionId/responses' Component={SurveyResponseList} />
        <Route path='admin/responses/:responseId' Component={SurveyResponseDetail} />
        <Route path='/admin/functions' Component={FunctionList} />
      </Routes>
    </Router>
  );
}

export default App;
