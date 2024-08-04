import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import CountdownTimer from './CountdownTimer';
import CountdownEnd from './CountdownEnd';
import backgroundGif from '../static/background_entry.gif';

const Countdown = ({ targetDate }) => {
  const navigate = useNavigate(); // Usa useNavigate para la redirección

  useEffect(() => {
    // Check if the page was reloaded
    const wasReloaded = sessionStorage.getItem('wasReloaded');

    if (wasReloaded) {
      // If the page was reloaded, redirect to the root
      navigate('/');
    } else {
      // Set the reloaded flag in session storage
      sessionStorage.setItem('wasReloaded', 'true');
    }

    return () => {
      // Remove the reloaded flag when the component unmounts
      sessionStorage.removeItem('wasReloaded');
    };
  }, [navigate]);

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
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      setTimeLeft(timeLeft);
      if (Object.keys(timeLeft).length === 0) {
        setHasEnded(true);
      }
    }, 1000);

    const fadeTimer = setTimeout(() => {
      setFadeIn(false);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(fadeTimer);
    };
  }, [targetDate]);

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
