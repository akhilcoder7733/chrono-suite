import {
  Box,
  Typography,
  TextField,
  Stack,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import useCountdown from "../hooks/useCountdown";
import formatCountdown from "../utils/formatCountdown";

const Countdown = () => {
  const [target, setTarget] = useState(null);

  const timeLeft = useCountdown(target);
  const { days, hours, minutes, seconds } =
    formatCountdown(timeLeft);

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
      <TextField
        type="datetime-local"
        label="Select Target Date"
        InputLabelProps={{ shrink: true }}
        onChange={(e) =>
          setTarget(new Date(e.target.value).getTime())
        }
      />

      {target && (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack direction="row" spacing={4}>
            <TimeBlock label="Days" value={days} />
            <TimeBlock label="Hours" value={hours} />
            <TimeBlock label="Minutes" value={minutes} />
            <TimeBlock label="Seconds" value={seconds} />
          </Stack>
        </Paper>
      )}
    </Box>
  );
};

const TimeBlock = ({ label, value }) => (
  <Box>
    <Typography
      sx={{
        fontFamily: "Google Sans Code, monospace",
        fontSize: "2rem",
        fontWeight: 600,
      }}
    >
      {String(value).padStart(2, "0")}
    </Typography>
    <Typography variant="body2">{label}</Typography>
  </Box>
);

export default Countdown;
