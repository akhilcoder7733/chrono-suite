import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useTimer from "../hooks/useTimer";
import formatTime from "../utils/formatTime";
import ProgressRing from "../components/common/ProgressRing";

const PRESETS = [
  { label: "Pomodoro", value: 25 },
  { label: "Short Break", value: 5 },
  { label: "Long Break", value: 15 },
];

const DEFAULT_MINUTES =
  parseInt(localStorage.getItem("chrono-duration")) || 25;

const Timer = () => {
  const {
    timeLeft,
    duration,
    isRunning,
    start,
    pause,
    reset,
    setNewDuration,
  } = useTimer(DEFAULT_MINUTES * 60);

  const [customMinutes, setCustomMinutes] =
    useState(DEFAULT_MINUTES);

  const progress =
    ((duration - timeLeft) / duration) * 100;

  useEffect(() => {
    localStorage.setItem(
      "chrono-duration",
      customMinutes
    );
  }, [customMinutes]);

  const handleCustomApply = () => {
    if (!customMinutes || customMinutes <= 0) return;
    setNewDuration(customMinutes * 60);
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      {/* Presets */}
      <Stack direction="row" spacing={2}>
        {PRESETS.map((preset) => (
          <Button
            key={preset.label}
            variant="outlined"
            onClick={() => {
              setCustomMinutes(preset.value);
              setNewDuration(preset.value * 60);
            }}
          >
            {preset.label}
          </Button>
        ))}
      </Stack>

      {/* Ring + Time */}
      <Box position="relative">
        <ProgressRing progress={progress} size={280} />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Google Sans Code, monospace",
              fontSize: { xs: "2.5rem", md: "4.5rem" },
              fontWeight: 600,
            }}
          >
            {formatTime(timeLeft)}
          </Typography>
        </Box>
      </Box>

      {/* Controls */}
      <Stack direction="row" spacing={2}>
        {!isRunning ? (
          <Button variant="contained" onClick={start}>
            Start
          </Button>
        ) : (
          <Button variant="outlined" onClick={pause}>
            Pause
          </Button>
        )}
        <Button variant="text" onClick={reset}>
          Reset
        </Button>
      </Stack>

      {/* Custom Input */}
      <Stack direction="row" spacing={2}>
        <TextField
          type="number"
          label="Minutes"
          size="small"
          value={customMinutes}
          onChange={(e) =>
            setCustomMinutes(Number(e.target.value))
          }
        />
        <Button variant="contained" onClick={handleCustomApply}>
          Apply
        </Button>
      </Stack>
    </Box>
  );
};

export default Timer;
