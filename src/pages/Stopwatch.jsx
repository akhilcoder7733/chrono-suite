import React from "react";
import { styled } from "@mui/system";
import { Box, Typography, Button, Stack, Paper, Divider } from "@mui/material";
import { motion } from "framer-motion";
import useStopwatch from "../hooks/useStopwatch";
import formatStopwatch from "../utils/formatStopwatch";
import FlipClock from "../components/clock/FlipClock";
import useNotification from "../app/notifications/useNotification";


const MotionBox = motion(Box);

/* ===========================
   Styled Components
=========================== */

const AmbientBackground = styled(motion.div)(({ theme }) => ({
  position: "fixed",
  inset: 0,
  zIndex: -1,
  overflow: "hidden",
  pointerEvents: "none",
}));

const AmbientOrb = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  width: 500,
  height: 500,
  borderRadius: "50%",
  filter: "blur(140px)",
  opacity: 0.15,
  background: theme.palette.primary.main,

  [theme.breakpoints.down("sm")]: {
    width: 300,
    height: 300,
  },
}));

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

const StopwatchCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 700,
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

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(0.5),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  opacity: 0.6,
  marginBottom: theme.spacing(4),
}));

const ControlButton = styled(motion(Button))(({ theme }) => ({
  minWidth: 120,
  borderRadius: 16,
  textTransform: "none",
  fontWeight: 600,
  padding: theme.spacing(1.2, 3),
}));

const LapsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  maxHeight: 220,
  overflowY: "auto",
  paddingRight: theme.spacing(1),
}));

const LapRow = styled(Box)(({ theme, highlight }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(1, 0),
  fontFamily: `"Google Sans Code", monospace`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  color:
    highlight === "fast"
      ? theme.palette.success.main
      : highlight === "slow"
        ? theme.palette.error.main
        : theme.palette.text.primary,
}));

/* ===========================
   Component
=========================== */

const Stopwatch = () => {
  const { addNotification } = useNotification();

  const { time, isRunning, laps, start, pause, reset, lap } = useStopwatch();

  const fastest = laps.length ? Math.min(...laps) : null;
  const slowest = laps.length ? Math.max(...laps) : null;

  const handleReset = () => {
  reset();
  addNotification(
    "Stopwatch Reset",
    "Your stopwatch has been reset."
  );
};


  return (
    <>
      <AmbientBackground>
        <AmbientOrb
          style={{ top: "-10%", left: "-10%" }}
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <AmbientOrb
          style={{ bottom: "-15%", right: "-15%" }}
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </AmbientBackground>

      <PageContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <StopwatchCard elevation={0}>
          <Title variant="h5">Stopwatch</Title>
          <Subtitle variant="body2">
            Precision time tracking with millisecond accuracy
          </Subtitle>

          <FlipClock formatted={formatStopwatch(time)} />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            {!isRunning ? (
              <ControlButton
                variant="contained"
                onClick={start}
                animate={{
                  scale: isRunning ? 0.95 : 1,
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                Start
              </ControlButton>
            ) : (
              <>
                <ControlButton
                  variant="outlined"
                  onClick={pause}
                  initial={{ borderRadius: 16 }}
                  animate={{ borderRadius: isRunning ? 30 : 16 }}
                  transition={{ duration: 0.3 }}
                >
                  Pause
                </ControlButton>

                <ControlButton
                  variant="contained"
                  onClick={lap}
                  whileTap={{ scale: 0.9 }}
                >
                  Lap
                </ControlButton>
              </>
            )}

            <ControlButton
              variant="text"
              onClick={handleReset}
              animate={{
                opacity: time > 0 ? 1 : 0.4,
              }}
            >
              Reset
            </ControlButton>
          </Stack>

          {laps.length > 0 && (
            <>
              <Divider sx={{ my: 4 }} />

              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Lap History
              </Typography>

              <LapsContainer>
                {laps.map((lapTime, index) => {
                  const highlight =
                    lapTime === fastest
                      ? "fast"
                      : lapTime === slowest
                        ? "slow"
                        : null;

                  return (
                    <LapRow key={index} highlight={highlight}>
                      <span>#{laps.length - index}</span>
                      <span>{formatStopwatch(lapTime)}</span>
                    </LapRow>
                  );
                })}
              </LapsContainer>
            </>
          )}
        </StopwatchCard>
      </PageContainer>
    </>
  );
};

export default Stopwatch;
