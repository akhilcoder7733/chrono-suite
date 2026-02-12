import React, { useContext } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import CalcButton from "../components/CalcButton";
import { CalculatorContext } from "../CalculatorContext";
import { useTheme, useMediaQuery } from "@mui/material";


const Grid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: theme.spacing(1.2),
}));

const ProMode = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const columns = isMobile ? 4 : 5;

  const {
    appendValue,
    clear,
    deleteLast,
    calculate,
    toggleAngleMode,
    angle,
  } = useContext(CalculatorContext);

  return (
    <Grid
      sx={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`
      }}
    >
      <CalcButton onClick={toggleAngleMode}>
        {angle.toUpperCase()}
      </CalcButton>
      <CalcButton onClick={() => appendValue("sin(")}>sin</CalcButton>
      <CalcButton onClick={() => appendValue("cos(")}>cos</CalcButton>
      <CalcButton onClick={() => appendValue("tan(")}>tan</CalcButton>
      <CalcButton varianttype="danger" onClick={clear}>AC</CalcButton>

      <CalcButton onClick={() => appendValue("log(")}>log</CalcButton>
      <CalcButton onClick={() => appendValue("ln(")}>ln</CalcButton>
      <CalcButton onClick={() => appendValue("√(")}>√</CalcButton>
      <CalcButton onClick={() => appendValue("^")}>^</CalcButton>
      <CalcButton onClick={deleteLast}>⌫</CalcButton>

      <CalcButton onClick={() => appendValue("(")}>(</CalcButton>
      <CalcButton onClick={() => appendValue(")")}>)</CalcButton>
      <CalcButton onClick={() => appendValue("π")}>π</CalcButton>
      <CalcButton onClick={() => appendValue("%")}>%</CalcButton>
      <CalcButton varianttype="operator" onClick={() => appendValue("÷")}>÷</CalcButton>

      {[7,8,9].map(n => (
        <CalcButton key={n} onClick={() => appendValue(n.toString())}>{n}</CalcButton>
      ))}
      <CalcButton varianttype="operator" onClick={() => appendValue("×")}>×</CalcButton>

      {[4,5,6].map(n => (
        <CalcButton key={n} onClick={() => appendValue(n.toString())}>{n}</CalcButton>
      ))}
      <CalcButton varianttype="operator" onClick={() => appendValue("-")}>-</CalcButton>

      {[1,2,3].map(n => (
        <CalcButton key={n} onClick={() => appendValue(n.toString())}>{n}</CalcButton>
      ))}
      <CalcButton varianttype="operator" onClick={() => appendValue("+")}>+</CalcButton>

      <CalcButton sx={{ gridColumn: "span 2" }} onClick={() => appendValue("0")}>0</CalcButton>
      <CalcButton onClick={() => appendValue(".")}>.</CalcButton>
      <CalcButton varianttype="operator" onClick={calculate}>=</CalcButton>
    </Grid>
  );
};

export default ProMode;
