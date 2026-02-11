import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import useStopwatch from "../hooks/useStopwatch";
import formatStopwatch from "../utils/formatStopwatch";

const Stopwatch = () => {
  const {
    time,
    isRunning,
    laps,
    start,
    pause,
    reset,
    lap,
  } = useStopwatch();

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
      <Typography
        sx={{
          fontFamily: "Google Sans Code, monospace",
          fontSize: { xs: "2.5rem", md: "4.5rem" },
          fontWeight: 600,
        }}
      >
        {formatStopwatch(time)}
      </Typography>

      <Stack direction="row" spacing={2}>
        {!isRunning ? (
          <Button variant="contained" onClick={start}>
            Start
          </Button>
        ) : (
          <>
            <Button variant="outlined" onClick={pause}>
              Pause
            </Button>
            <Button variant="contained" onClick={lap}>
              Lap
            </Button>
          </>
        )}
        <Button variant="text" onClick={reset}>
          Reset
        </Button>
      </Stack>

      {laps.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 400,
            p: 2,
            mt: 2,
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {laps.map((lapTime, index) => (
            <Typography
              key={index}
              sx={{
                fontFamily: "Google Sans Code, monospace",
                py: 0.5,
              }}
            >
              Lap {laps.length - index}:{" "}
              {formatStopwatch(lapTime)}
            </Typography>
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default Stopwatch;
