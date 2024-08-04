import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Countdown from './components/Countdown';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute'; // Asegúrate de importar PrivateRoute
import { AuthProvider } from './components/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='bg-black min-h-screen w-full'>
          <Routes>
            <Route
              path="/"
              element={<Login />}
            />
            <Route
              path="/home"
              element={<PrivateRoute element={<div className="flex items-center justify-center h-screen"><Countdown targetDate="2024-08-03T21:10:00" /></div>} />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
