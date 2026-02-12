import React from "react";
import { styled } from "@mui/system";
import { Box } from "@mui/material";
import FlipDigit from "./FlipDigit";

const ClockWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "center",
  gap: "0.1em",
  fontSize: "4.5rem",

  [theme.breakpoints.down("md")]: {
    fontSize: "3.5rem",
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: "2.5rem",
  },
}));

const Separator = styled(Box)(({ theme }) => ({
  fontFamily: `"Google Sans Code", monospace`,
  opacity: 0.6,
}));

const StaticMs = styled(Box)(({ theme }) => ({
  fontFamily: `"Google Sans Code", monospace`,
  fontSize: "0.5em",
  marginLeft: "0.2em",
  opacity: 0.8,
}));

const FlipClock = ({ formatted }) => {
  // formatted example: "01:23.45"
  const [main, ms] = formatted.split(".");

  return (
    <ClockWrapper>
      {main.split("").map((char, index) =>
        char === ":" ? (
          <Separator key={index}>{char}</Separator>
        ) : (
          <FlipDigit key={index} value={char} />
        )
      )}

      <Separator>.</Separator>
      <StaticMs>{ms}</StaticMs>
    </ClockWrapper>
  );
};

export default FlipClock;
