import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ManageItems from './pages/ManageItems';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manage" element={<ManageItems />} />
      </Routes>
    </Router>
  );
};

export default App;
