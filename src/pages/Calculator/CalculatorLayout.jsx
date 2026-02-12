import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import CalculatorDisplay from "./CalculatorDisplay";
import ModeToggle from "./components/ModeToggle";
import CalculatorKeypad from "./CalculatorKeypad";

const MotionBox = motion(Box);

const Root = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
}));

const CalculatorContainer = styled(MotionBox)(({ theme }) => ({
  width: "100%",
  maxWidth: 420,
  borderRadius: 28,
  padding: theme.spacing(3),
  backdropFilter: "blur(20px)",
  background:
    theme.palette.mode === "dark"
      ? "rgba(30,30,40,0.6)"
      : "rgba(255,255,255,0.7)",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 10px 40px rgba(0,0,0,0.5)"
      : "0 10px 40px rgba(0,0,0,0.1)",
}));

const CalculatorLayout = () => {

  return (
    <Root>
      <CalculatorContainer
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ModeToggle />
        <CalculatorDisplay />
        <Box
  sx={{
    maxHeight: "60vh",
    overflowY: "auto",
    pr: 1,
  }}
>
  <CalculatorKeypad />
</Box>

        {/* Keypad will go here next phase */}
      </CalculatorContainer>
    </Root>
  );
};

export default CalculatorLayout;
