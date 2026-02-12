import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Typography,
  TextField,
  Stack,
  Paper,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import useCountdown from "../hooks/useCountdown";
import formatCountdown from "../utils/formatCountdown";
import useNotification from "../app/notifications/useNotification";

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

const CountdownCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 900,
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
  marginBottom: theme.spacing(1),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  opacity: 0.6,
  marginBottom: theme.spacing(4),
}));

const StyledInput = styled(TextField)(({ theme }) => ({
  maxWidth: 350,
}));

const TargetText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  opacity: 0.7,
}));

const TimeGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: theme.spacing(3),
  marginTop: theme.spacing(5),

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
}));

const TimeCard = styled(motion.div)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 20,
  textAlign: "center",
  backdropFilter: "blur(15px)",
  background: `${theme.palette.background.default}aa`,
  border: `1px solid ${theme.palette.divider}`,
}));

const TimeValue = styled(Typography)(({ theme }) => ({
  fontFamily: `"Google Sans Code", monospace`,
  fontSize: "3rem",
  fontWeight: 700,

  [theme.breakpoints.down("sm")]: {
    fontSize: "2.2rem",
  },
}));

const TimeLabel = styled(Typography)(({ theme }) => ({
  opacity: 0.6,
  marginTop: theme.spacing(1),
}));

const FooterNote = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  textAlign: "center",
  opacity: 0.6,
}));

/* ===========================
   Component
=========================== */

const Countdown = () => {
  const { addNotification } = useNotification();

  const [target, setTarget] = useState(null);

  const timeLeft = useCountdown(target);
  const { days, hours, minutes, seconds } = formatCountdown(timeLeft);

  useEffect(() => {
    if (target && timeLeft === 0) {
      addNotification(
        "Countdown Completed",
        "Your selected date has been reached.",
      );
    }
  }, [timeLeft, target, addNotification]);

  return (
    <PageContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <CountdownCard elevation={0}>
        <Title variant="h5">Countdown</Title>
        <Subtitle variant="body2">
          Track time remaining until your important milestone
        </Subtitle>

        <Stack spacing={2}>
          <StyledInput
            type="datetime-local"
            label="Select Target Date"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setTarget(new Date(e.target.value).getTime())}
          />

          {target && (
            <TargetText variant="body2">
              Target: {dayjs(target).format("DD MMM YYYY • hh:mm A")}
            </TargetText>
          )}
        </Stack>

        {target && (
          <>
            <Divider sx={{ my: 4 }} />

            <TimeGrid>
              <TimeBlock label="Days" value={days} />
              <TimeBlock label="Hours" value={hours} />
              <TimeBlock label="Minutes" value={minutes} />
              <TimeBlock label="Seconds" value={seconds} />
            </TimeGrid>

            <FooterNote variant="body2">
              Time remaining until your selected date
            </FooterNote>
          </>
        )}
      </CountdownCard>
    </PageContainer>
  );
};

/* ===========================
   Time Block Component
=========================== */

const TimeBlock = ({ label, value }) => (
  <TimeCard
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    whileHover={{ scale: 1.05 }}
  >
    <TimeValue>{String(value).padStart(2, "0")}</TimeValue>
    <TimeLabel variant="body2">{label}</TimeLabel>
  </TimeCard>
);

export default Countdown;
