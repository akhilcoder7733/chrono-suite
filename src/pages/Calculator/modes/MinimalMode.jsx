import React, { useContext } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import CalcButton from "../components/CalcButton";
import { CalculatorContext } from "../CalculatorContext";

const Grid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: theme.spacing(1.5),
}));

const MinimalMode = () => {
  const {
    appendValue,
    clear,
    deleteLast,
    calculate,
  } = useContext(CalculatorContext);

  return (
    <Grid>
      <CalcButton varianttype="danger" onClick={clear}>AC</CalcButton>
      <CalcButton onClick={deleteLast}>⌫</CalcButton>
      <CalcButton onClick={() => appendValue("%")}>%</CalcButton>
      <CalcButton varianttype="operator" onClick={() => appendValue("÷")}>÷</CalcButton>

      {[7,8,9].map(n => (
        <CalcButton key={n} onClick={() => appendValue(n.toString())}>
          {n}
        </CalcButton>
      ))}
      <CalcButton varianttype="operator" onClick={() => appendValue("×")}>×</CalcButton>

      {[4,5,6].map(n => (
        <CalcButton key={n} onClick={() => appendValue(n.toString())}>
          {n}
        </CalcButton>
      ))}
      <CalcButton varianttype="operator" onClick={() => appendValue("-")}>-</CalcButton>

      {[1,2,3].map(n => (
        <CalcButton key={n} onClick={() => appendValue(n.toString())}>
          {n}
        </CalcButton>
      ))}
      <CalcButton varianttype="operator" onClick={() => appendValue("+")}>+</CalcButton>

      <CalcButton sx={{ gridColumn: "span 2" }} onClick={() => appendValue("0")}>
        0
      </CalcButton>
      <CalcButton onClick={() => appendValue(".")}>.</CalcButton>
      <CalcButton varianttype="operator" onClick={calculate}>=</CalcButton>
    </Grid>
  );
};

export default MinimalMode;
