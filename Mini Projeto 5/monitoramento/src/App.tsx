import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';
import ActivityDetails from './ActivityDetails';
import CalendarView from './CalendarView';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<ActivityForm />} />
        <Route path="/editar/:id" element={<ActivityForm />} />
        <Route path="/atividades" element={<ActivityList />} />
        <Route path="/atividade/:id" element={<ActivityDetails />} />
        <Route path="/calendario" element={<CalendarView />} />
      </Routes>
    </Router>
  );
};

export default App;
