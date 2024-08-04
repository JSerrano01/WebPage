import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir al usuario
import CountdownTimer from './CountdownTimer';
import CountdownEnd from './CountdownEnd';
import backgroundGif from '../static/background_entry.gif';
import { useAuth } from '../components/AuthContext'; // Para acceder al contexto de autenticación

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [hasEnded, setHasEnded] = useState(false);
  const [fadeIn, setFadeIn] = useState(true); // Agregado para el efecto fade-in

  const { logout } = useAuth(); // Accede a la función de logout del contexto de autenticación
  const navigate = useNavigate(); // Para redirigir al usuario

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      setTimeLeft(timeLeft);
      if (Object.keys(timeLeft).length === 0) {
        setHasEnded(true);
      }
    }, 1000);

    // Desactivar el fade-in después de 2 segundos
    const fadeTimer = setTimeout(() => {
      setFadeIn(false);
    }, 2000);

    // Manejar la inactividad del usuario
    let inactivityTimer;
    
    const handleUserActivity = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        logout();
        navigate('/'); // Redirigir al usuario a la página de inicio de sesión
      }, 60000); // 1 minuto de inactividad
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    handleUserActivity(); // Inicializa el temporizador en el montaje

    return () => {
      clearInterval(timer);
      clearTimeout(fadeTimer);
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, [targetDate, logout, navigate]);

  return (
    <div className={`relative w-full h-screen overflow-hidden ${fadeIn ? 'fade-in' : ''}`}>
      <img
        src={backgroundGif}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div
        className={`absolute inset-0 flex items-center justify-center z-10 text-white text-center transition-opacity duration-1000 ${hasEnded ? 'opacity-0' : 'opacity-100'}`}
        style={{ fontFamily: 'Monster Clubhouse, sans-serif' }}
      >
        <div className="w-full max-w-5xl rounded-3xl p-4 bg-black bg-opacity-50">
          <CountdownTimer timeLeft={timeLeft} />
        </div>
      </div>
      <div
        className={`absolute inset-0 flex items-center justify-center z-10 text-white text-center transition-opacity duration-1000 ${hasEnded ? 'opacity-100' : 'opacity-0'}`}
        style={{ fontFamily: 'Monster Clubhouse, sans-serif' }}
      >
        <div className="w-full max-w-5xl rounded-3xl p-4 bg-black bg-opacity-50">
          <CountdownEnd />
        </div>
      </div>
    </div>
  );
};

export default Countdown;
