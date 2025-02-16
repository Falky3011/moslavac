import React, { useState, useEffect } from "react";

const Countdown = ({ targetDate, homeScore, awayScore }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    if (difference <= 0) return null;

    return {
      d: Math.floor(difference / (1000 * 60 * 60 * 24)),
      h: Math.floor((difference / (1000 * 60 * 60)) % 24),
      m: Math.floor((difference / 1000 / 60) % 60),
      s: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    if (!timeLeft) return;

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (!newTimeLeft) {
        clearInterval(timer);
      }
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div>
      {timeLeft ? (
        Object.entries(timeLeft).map(([unit, value]) => (
          <span key={unit}>
            {value} {unit}{" "}
          </span>
        ))
      ) : (
        <span>
          {homeScore} - {awayScore}
        </span>
      )}
    </div>
  );
};

export default Countdown;
