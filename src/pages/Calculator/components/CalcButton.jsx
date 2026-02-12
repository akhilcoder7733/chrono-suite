import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

const StyledButton = styled(MotionButton)(
  ({ theme, varianttype }) => ({
    height: 64,
    borderRadius: 18,
    fontWeight: 500,
    fontSize: "1rem",
    textTransform: "none",
    backdropFilter: "blur(10px)",

    background:
      varianttype === "operator"
        ? theme.palette.primary.main
        : varianttype === "danger"
        ? theme.palette.error.main
        : theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.05)"
        : "rgba(0,0,0,0.05)",

    color:
      varianttype === "operator" || varianttype === "danger"
        ? "#fff"
        : theme.palette.text.primary,

    "&:hover": {
      background:
        varianttype === "operator"
          ? theme.palette.primary.dark
          : varianttype === "danger"
          ? theme.palette.error.dark
          : theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.1)"
          : "rgba(0,0,0,0.08)",
    },
  })
);

const CalcButton = ({ children, onClick, varianttype = "default", sx }) => {
  return (
    <StyledButton
      varianttype={varianttype}
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 300 }}
      sx={sx}
    >
      {children}
    </StyledButton>
  );
};

export default CalcButton;
