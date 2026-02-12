import React from "react";
import CalculatorProvider from "./CalculatorContext";
import CalculatorLayout from "./CalculatorLayout";

const CalculatorPage = () => {
  return (
    <CalculatorProvider>
      <CalculatorLayout />
    </CalculatorProvider>
  );
};

export default CalculatorPage;
