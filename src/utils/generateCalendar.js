const generateCalendar = (currentMonth) => {
  const startOfMonth = currentMonth.startOf("month");
  const startDay = startOfMonth.day(); // 0–6
  const daysInMonth = currentMonth.daysInMonth();

  const days = [];

  const prevMonth = currentMonth.subtract(1, "month");
  const prevMonthDays = prevMonth.daysInMonth();

  // Previous month overflow
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      date: prevMonthDays - i,
      current: false,
    });
  }

  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: i,
      current: true,
    });
  }

  // Next month overflow
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      date: i,
      current: false,
    });
  }

  return days;
};

export default generateCalendar;
