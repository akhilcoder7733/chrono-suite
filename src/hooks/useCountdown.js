import { useEffect, useRef, useState } from "react";

const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!targetDate) return;

    const tick = () => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(intervalRef.current);
        setTimeLeft(0);
        return;
      }

      setTimeLeft(diff);
    };

    tick(); // run immediately
    intervalRef.current = setInterval(tick, 250);

    return () => clearInterval(intervalRef.current);
  }, [targetDate]);

  return timeLeft;
};

export default useCountdown;
