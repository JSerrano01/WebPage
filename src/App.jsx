import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Countdown from './components/Countdown';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider, useAuth } from './components/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Main />
      </Router>
    </AuthProvider>
  );
}

function Main() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const handleReload = () => {
      if (isAuthenticated) {
        sessionStorage.setItem('isAuthenticated', 'true');
      } else {
        sessionStorage.removeItem('isAuthenticated');
      }
    };

    window.addEventListener('beforeunload', handleReload);

    return () => {
      window.removeEventListener('beforeunload', handleReload);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('isAuthenticated');
    if (sessionAuth) {
      setIsAuthenticated(true);
    } else {
      navigate('/');
    }
  }, [navigate, setIsAuthenticated]);

  return (
    <div className='bg-black min-h-screen w-full'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={<PrivateRoute element={<div className="flex items-center justify-center h-screen"><Countdown targetDate="2024-08-03T21:33:00" /></div>} />}
        />
      </Routes>
    </div>
  );
}

export default App;
