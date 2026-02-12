import React from "react";
import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

/* ===========================
   Styled Components
=========================== */

const SplashContainer = styled(MotionBox)(({ theme }) => ({
  position: "fixed",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(0px)",
  background: theme.palette.background.default,
  overflow: "hidden",
  zIndex: 9999,

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const GlowOrb = styled(MotionBox)(({ theme }) => ({
  position: "absolute",
  width: 450,
  height: 450,
  borderRadius: "50%",
  background: theme.palette.primary.main,
  filter: "blur(160px)",
  opacity: 0.25,

  [theme.breakpoints.down("sm")]: {
    width: 280,
    height: 280,
  },
}));

const ClockWrapper = styled(MotionBox)(({ theme }) => ({
  width: 90,
  height: 90,
  borderRadius: "50%",
  border: `3px solid ${theme.palette.primary.main}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  marginBottom: theme.spacing(4),

  [theme.breakpoints.down("sm")]: {
    width: 70,
    height: 70,
  },
}));

const ClockHand = styled(MotionBox)(({ theme }) => ({
  position: "absolute",
  width: 2,
  height: "35%",
  background: theme.palette.primary.main,
  top: "15%",
  transformOrigin: "bottom center",
}));

const LogoWrapper = styled(MotionBox)(({ theme }) => ({
  display: "flex",
  gap: "0.25rem",
  flexWrap: "wrap",
  justifyContent: "center",
}));

const Letter = styled(MotionTypography)(({ theme }) => ({
  fontFamily: `"Ubuntu", sans-serif`,
  fontWeight: 800,
  fontSize: "2.5rem",
  letterSpacing: "0.15rem",
  color: theme.palette.text.primary,

  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
  },
}));

const LoadingBar = styled(MotionBox)(({ theme }) => ({
  marginTop: theme.spacing(5),
  width: 200,
  height: 4,
  borderRadius: 8,
  background: theme.palette.divider,
  overflow: "hidden",

  [theme.breakpoints.down("sm")]: {
    width: 150,
  },
}));

const Progress = styled(MotionBox)(({ theme }) => ({
  height: "100%",
  background: theme.palette.primary.main,
}));

/* ===========================
   Animation Variants
=========================== */

const containerVariants = {
  exit: {
    opacity: 0,
    filter: "blur(12px)",
    transition: { duration: 0.6 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.8 + i * 0.06,
      duration: 0.5,
    },
  }),
};

/* ===========================
   Component
=========================== */

const SplashScreen = () => {
  const text = "CHRONO SUITE".split("");

  return (
    <SplashContainer
      variants={containerVariants}
      initial={{ opacity: 1 }}
      exit="exit"
    >
      {/* Glow */}
      <GlowOrb
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Clock */}
      <ClockWrapper
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <ClockHand
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
        />
      </ClockWrapper>

      {/* Logo Letters */}
      <LogoWrapper>
        {text.map((char, index) => (
          <Letter
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={letterVariants}
          >
            {char === " " ? "\u00A0" : char}
          </Letter>
        ))}
      </LogoWrapper>

      {/* Loading */}
      <LoadingBar>
        <Progress
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5 }}
        />
      </LoadingBar>
    </SplashContainer>
  );
};

export default SplashScreen;
