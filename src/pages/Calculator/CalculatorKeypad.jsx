import React, { useContext } from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { CalculatorContext } from "./CalculatorContext";
import MinimalMode from "./modes/MinimalMode";
import ProMode from "./modes/ProMode";

const MotionBox = motion(Box);

const CalculatorKeypad = () => {
  const { mode } = useContext(CalculatorContext);

  return (
    <AnimatePresence mode="wait">
      <MotionBox
        key={mode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
      >
        {mode === "minimal" ? <MinimalMode /> : <ProMode />}
      </MotionBox>
    </AnimatePresence>
  );
};

export default CalculatorKeypad;
