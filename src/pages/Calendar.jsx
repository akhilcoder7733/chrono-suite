import React, { useState } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import generateCalendar from "../utils/generateCalendar";

dayjs.extend(dayOfYear);

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MotionBox = motion(Box);

/* ===========================
   Styled Components
=========================== */

const PageContainer = styled(MotionBox)(({ theme }) => ({
  minHeight: "85vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const CalendarCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 1000,
  padding: theme.spacing(5),
  borderRadius: 28,
  backdropFilter: "blur(25px)",
  background: `${theme.palette.background.paper}cc`,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: `
    8px 8px 20px ${theme.palette.mode === "dark" ? "#00000040" : "#00000015"},
    -8px -8px 20px ${theme.palette.mode === "dark" ? "#ffffff05" : "#ffffff80"}
  `,

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(4),
}));

const MonthTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
}));

const WeekGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  marginBottom: theme.spacing(2),
}));

const DaysGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: theme.spacing(1.5),
}));

const DayCell = styled(motion.div)(({ theme, isToday, isSelected, current }) => ({
  aspectRatio: "1 / 1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 16,
  cursor: current ? "pointer" : "default",
  background: isSelected
    ? theme.palette.primary.main
    : isToday
    ? theme.palette.primary.main + "22"
    : current
    ? theme.palette.action.hover
    : "transparent",
  color: isSelected
    ? "#fff"
    : current
    ? theme.palette.text.primary
    : theme.palette.text.secondary,
  border: isToday ? `1px solid ${theme.palette.primary.main}` : "none",
}));

const SidePanel = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(5),
}));

/* ===========================
   Component
=========================== */

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const today = dayjs();
  const days = generateCalendar(currentMonth);

  const handlePrev = () =>
    setCurrentMonth((prev) => prev.subtract(1, "month"));

  const handleNext = () =>
    setCurrentMonth((prev) => prev.add(1, "month"));

  const handleToday = () => {
    setCurrentMonth(dayjs());
    setSelectedDate(dayjs());
  };

  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <CalendarCard elevation={0}>
        {/* Header */}
        <Header>
          <IconButton onClick={handlePrev}>
            <ArrowBackIosNewIcon />
          </IconButton>

          <MonthTitle variant="h5">
            {currentMonth.format("MMMM YYYY")}
          </MonthTitle>

          <Box display="flex" alignItems="center" gap={1}>
            <Button variant="outlined" onClick={handleToday}>
              Today
            </Button>

            <IconButton onClick={handleNext}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Header>

        {/* Week Labels */}
        <WeekGrid>
          {weekDays.map((day) => (
            <Typography
              key={day}
              align="center"
              variant="body2"
              fontWeight={600}
              sx={{ opacity: 0.6 }}
            >
              {day}
            </Typography>
          ))}
        </WeekGrid>

        {/* Days */}
        <AnimatePresence mode="wait">
          <DaysGrid
            key={currentMonth.format("MM-YYYY")}
            as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {days.map((day, index) => {
              const isToday =
                day.current &&
                today.date() === day.date &&
                today.month() === currentMonth.month() &&
                today.year() === currentMonth.year();

              const isSelected =
                day.current &&
                selectedDate.date() === day.date &&
                selectedDate.month() === currentMonth.month() &&
                selectedDate.year() === currentMonth.year();

              return (
                <DayCell
                  key={index}
                  current={day.current}
                  isToday={isToday}
                  isSelected={isSelected}
                  whileHover={day.current ? { scale: 1.08 } : {}}
                  whileTap={day.current ? { scale: 0.95 } : {}}
                  onClick={() =>
                    day.current &&
                    setSelectedDate(
                      currentMonth.date(day.date)
                    )
                  }
                >
                  <Typography fontWeight={500}>
                    {day.date}
                  </Typography>
                </DayCell>
              );
            })}
          </DaysGrid>
        </AnimatePresence>

        <Divider sx={{ my: 4 }} />

        {/* Side Info */}
        <SidePanel>
          <Typography variant="h6" fontWeight={600}>
            {selectedDate.format("dddd, DD MMMM YYYY")}
          </Typography>

          <Typography variant="body2" sx={{ opacity: 0.6, mt: 1 }}>
            Day {selectedDate.dayOfYear()} of the year
          </Typography>

          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            {dayjs().diff(selectedDate, "day") > 0
              ? `${dayjs().diff(selectedDate, "day")} days ago`
              : `${selectedDate.diff(dayjs(), "day")} days remaining`}
          </Typography>
        </SidePanel>
      </CalendarCard>
    </PageContainer>
  );
};

export default Calendar;
