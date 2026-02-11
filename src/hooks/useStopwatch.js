import { useState, useRef, useEffect } from "react";

const useStopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const startTimeRef = useRef(0);
  const accumulatedRef = useRef(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (isRunning) return;

    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      setTime(accumulatedRef.current + (now - startTimeRef.current));
    }, 30);

    setIsRunning(true);
  };

  const pause = () => {
    if (!isRunning) return;

    clearInterval(intervalRef.current);
    accumulatedRef.current = time;
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
    accumulatedRef.current = 0;
    setLaps([]);
  };

  const lap = () => {
    if (!isRunning) return;
    setLaps((prev) => [time, ...prev]);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return {
    time,
    isRunning,
    laps,
    start,
    pause,
    reset,
    lap,
  };
};

export default useStopwatch;
