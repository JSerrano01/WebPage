import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Countdown from './components/Countdown';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <div className='bg-black min-h-screen w-full'>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
          <Route
            path="/home"
            element={<div className="flex items-center justify-center h-screen"><Countdown targetDate="2024-08-07T00:00:00" /></div>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
