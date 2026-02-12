import React from "react";
import { styled } from "@mui/system";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const DigitWrapper = styled(Box)(({ theme }) => ({
  perspective: 1000,
  width: "1ch",
  height: "1.4em",
  position: "relative",
}));

const Digit = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  fontFamily: `"Google Sans Code", monospace`,
  fontWeight: 700,
  fontSize: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backfaceVisibility: "hidden",
}));

const FlipDigit = ({ value }) => {
  return (
    <DigitWrapper>
      <AnimatePresence mode="wait">
        <Digit
          key={value}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {value}
        </Digit>
      </AnimatePresence>
    </DigitWrapper>
  );
};

export default FlipDigit;
