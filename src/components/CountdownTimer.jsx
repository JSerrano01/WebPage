import React from 'react';

const CountdownTimer = ({ timeLeft }) => {
  const { days = 0, hours = 0, minutes = 0, seconds = 0 } = timeLeft;

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="flex flex-wrap justify-center space-x-4 md:space-x-6">
        <div className="text-5xl sm:text-6xl md:text-7xl">
          {days.toString().padStart(2, '0')}
          <div className="text-sm sm:text-base md:text-md">Days</div>
        </div>
        <div className="text-5xl sm:text-6xl md:text-7xl">
          {hours.toString().padStart(2, '0')}
          <div className="text-sm sm:text-base md:text-md">Hours</div>
        </div>
        <div className="text-5xl sm:text-6xl md:text-7xl">
          {minutes.toString().padStart(2, '0')}
          <div className="text-sm sm:text-base md:text-md">Minutes</div>
        </div>
        <div className="text-5xl sm:text-6xl md:text-7xl">
          {seconds.toString().padStart(2, '0')}
          <div className="text-sm sm:text-base md:text-md">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

