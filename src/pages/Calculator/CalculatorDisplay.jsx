import React, { useContext } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { motion, AnimatePresence } from "framer-motion";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CalculatorContext } from "./CalculatorContext";

const MotionTypography = motion(Typography);

const DisplayWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  borderRadius: 20,
  background:
    theme.palette.mode === "dark"
      ? "rgba(20,20,30,0.6)"
      : "rgba(240,240,250,0.6)",
  backdropFilter: "blur(12px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "center",
  minHeight: 120,
  position: "relative",
}));

const ExpressionText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Google Sans Code", monospace',
  fontSize: "0.9rem",
  opacity: 0.6,
  wordBreak: "break-all",
}));

const ResultText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Google Sans Code", monospace',
  fontSize: "2rem",
  fontWeight: 600,
  marginTop: theme.spacing(1),
  wordBreak: "break-all",
}));

const CalculatorDisplay = () => {
  const { expression, result } = useContext(CalculatorContext);

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
    }
  };

  return (
    <DisplayWrapper>
      <ExpressionText>
        {expression || "0"}
      </ExpressionText>

      <AnimatePresence mode="wait">
        <MotionTypography
          key={result}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          component={ResultText}
        >
          {result || ""}
        </MotionTypography>
      </AnimatePresence>

      {result && (
        <IconButton
          size="small"
          onClick={copyResult}
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            opacity: 0.6,
          }}
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      )}
    </DisplayWrapper>
  );
};

export default CalculatorDisplay;
