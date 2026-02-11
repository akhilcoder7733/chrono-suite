import {
  Box,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import dayjs from "dayjs";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import generateCalendar from "../utils/generateCalendar";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const today = dayjs();
  const days = generateCalendar(currentMonth);

  const handlePrev = () =>
    setCurrentMonth((prev) => prev.subtract(1, "month"));

  const handleNext = () =>
    setCurrentMonth((prev) => prev.add(1, "month"));

  return (
    <Box
      component={motion.div}
      key={currentMonth.format("MM-YYYY")}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 800,
          p: 4,
          borderRadius: 4,
          backgroundColor: "background.paper",
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <IconButton onClick={handlePrev}>
            <ArrowBackIosNewIcon />
          </IconButton>

          <Typography variant="h4" fontWeight={600}>
            {currentMonth.format("MMMM YYYY")}
          </Typography>

          <IconButton onClick={handleNext}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        {/* Week Labels */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            mb: 2,
          }}
        >
          {weekDays.map((day) => (
            <Typography
              key={day}
              align="center"
              variant="body2"
              fontWeight={600}
              sx={{ opacity: 0.7 }}
            >
              {day}
            </Typography>
          ))}
        </Box>

        {/* Days Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 1.5,
          }}
        >
          {days.map((day, index) => {
            const isToday =
              day.current &&
              today.date() === day.date &&
              today.month() === currentMonth.month() &&
              today.year() === currentMonth.year();

            return (
              <Box
                key={index}
                sx={{
                  aspectRatio: "1 / 1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 3,
                  cursor: "pointer",
                  transition: "0.2s",
                  backgroundColor: isToday
                    ? "primary.main"
                    : day.current
                    ? "action.hover"
                    : "transparent",
                  color: isToday
                    ? "#fff"
                    : day.current
                    ? "text.primary"
                    : "text.secondary",
                  "&:hover": {
                    backgroundColor: isToday
                      ? "primary.dark"
                      : "action.selected",
                  },
                }}
              >
                <Typography fontWeight={500}>
                  {day.date}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
};

export default Calendar;
