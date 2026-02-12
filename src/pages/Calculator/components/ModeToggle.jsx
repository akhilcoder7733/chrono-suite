import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import { CalculatorContext } from "../CalculatorContext";

const ToggleWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const ModeToggle = () => {
  const { mode, toggleMode } = useContext(CalculatorContext);

  return (
    <ToggleWrapper>
      <Button
        variant="contained"
        onClick={toggleMode}
        sx={{
          borderRadius: 20,
          textTransform: "none",
        }}
      >
        {mode === "minimal" ? "Switch to Pro" : "Switch to Minimal"}
      </Button>
    </ToggleWrapper>
  );
};

export default ModeToggle;
