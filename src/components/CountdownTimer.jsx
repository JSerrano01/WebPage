import React from 'react';

const CountdownTimer = ({ timeLeft }) => {
  const timerComponents = [];

  Object.keys(timeLeft).forEach(interval => {
    if (timeLeft[interval] || interval === 'days') {
      timerComponents.push(
        <div key={interval} className="flex flex-col items-center mx-2 sm:mx-4">
          <span className="text-3xl sm:text-6xl">{timeLeft[interval]}</span>
          <span className="text-lg sm:text-2xl">{interval}</span>
        </div>
      );
    }
  });

  return (
    <div className="w-full flex items-center justify-center">
      {timerComponents.length ? timerComponents : null}
    </div>
  );
};

export default CountdownTimer;
