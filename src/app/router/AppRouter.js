import { Routes, Route, Navigate } from "react-router-dom";
import Timer from "../../pages/Timer";
import Stopwatch from "../../pages/Stopwatch";
import Countdown from "../../pages/Countdown";
import Calendar from "../../pages/Calendar";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/timer" />} />
      <Route path="/timer" element={<Timer />} />
      <Route path="/stopwatch" element={<Stopwatch />} />
      <Route path="/countdown" element={<Countdown />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  );
};

export default AppRouter;
