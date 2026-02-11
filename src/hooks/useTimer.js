import { useEffect, useRef, useState, useCallback } from "react";

const useTimer = (initialSeconds = 1500) => {
  const [duration, setDuration] = useState(initialSeconds * 1000);
  const [timeLeft, setTimeLeft] = useState(initialSeconds * 1000);
  const [isRunning, setIsRunning] = useState(false);

  const startTimeRef = useRef(null);
  const remainingRef = useRef(timeLeft);
  const intervalRef = useRef(null);

  const tick = useCallback(() => {
    const now = Date.now();
    const elapsed = now - startTimeRef.current;
    const remaining = remainingRef.current - elapsed;

    if (remaining <= 0) {
      clearInterval(intervalRef.current);
      setTimeLeft(0);
      setIsRunning(false);
      return;
    }

    setTimeLeft(remaining);
  }, []);

  const start = () => {
    if (isRunning) return;

    startTimeRef.current = Date.now();
    remainingRef.current = timeLeft;
    intervalRef.current = setInterval(tick, 250);
    setIsRunning(true);
  };

  const pause = () => {
    if (!isRunning) return;

    clearInterval(intervalRef.current);
    remainingRef.current = timeLeft;
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(duration);
    setIsRunning(false);
  };

  const setNewDuration = (seconds) => {
    clearInterval(intervalRef.current);
    const newDuration = seconds * 1000;
    setDuration(newDuration);
    setTimeLeft(newDuration);
    setIsRunning(false);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return {
    timeLeft,
    duration,
    isRunning,
    start,
    pause,
    reset,
    setNewDuration,
  };
};

export default useTimer;
