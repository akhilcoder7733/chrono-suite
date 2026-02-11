import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const formatCountdown = (ms) => {
  const d = dayjs.duration(ms);

  const days = Math.floor(d.asDays());
  const hours = d.hours();
  const minutes = d.minutes();
  const seconds = d.seconds();

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

export default formatCountdown;
