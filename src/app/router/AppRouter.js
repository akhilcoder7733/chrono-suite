import { Routes, Route, Navigate } from "react-router-dom";
import Timer from "../../pages/Timer";
import Stopwatch from "../../pages/Stopwatch";
import Countdown from "../../pages/Countdown";
import Calendar from "../../pages/Calendar";
import CalculatorPage from "../../pages/Calculator/CalculatorPage";
import NotFound from "../../pages/NotFound";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/timer" />} />
      <Route path="/timer" element={<Timer />} />
      <Route path="/stopwatch" element={<Stopwatch />} />
      <Route path="/countdown" element={<Countdown />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/calculator" element={<CalculatorPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
