import React from 'react';

const CountdownTimer = ({ timeLeft }) => {
  const { days = 0, hours = 0, minutes = 0, seconds = 0 } = timeLeft;

  return (
    <div className="flex flex-col items-center justify-center text-3xl text-white">
      <div className="flex space-x-6">
        <div className="text-7xl">
          {days.toString().padStart(2, '0')}
          <div className="text-md">Days</div>
        </div>
        <div className="text-7xl">
          {hours.toString().padStart(2, '0')}
          <div className="text-md">Hours</div>
        </div>
        <div className="text-7xl">
          {minutes.toString().padStart(2, '0')}
          <div className="text-md">Minutes</div>
        </div>
        <div className="text-7xl">
          {seconds.toString().padStart(2, '0')}
          <div className="text-md">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
