import React, { createContext, useState, useCallback } from "react";
import { evaluateExpression, setAngleMode } from "./calculatorLogic";

export const CalculatorContext = createContext(null);

const CalculatorProvider = ({ children }) => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("minimal"); // minimal | pro
  const [angle, setAngle] = useState("deg");   // deg | rad
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState(0);

  const appendValue = useCallback((value) => {
    setExpression((prev) => prev + value);
  }, []);

  const clear = useCallback(() => {
    setExpression("");
    setResult("");
  }, []);

  const deleteLast = useCallback(() => {
    setExpression((prev) => prev.slice(0, -1));
  }, []);

  const calculate = useCallback(() => {
    const evaluated = evaluateExpression(expression);

    if (evaluated !== "Error") {
      setHistory((prev) => [
        ...prev,
        { expression, result: evaluated, id: Date.now() },
      ]);
    }

    setResult(evaluated);
  }, [expression]);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "minimal" ? "pro" : "minimal"));
  }, []);

  const toggleAngleMode = useCallback(() => {
    const newMode = angle === "deg" ? "rad" : "deg";
    setAngle(newMode);
    setAngleMode(newMode);
  }, [angle]);

  // Memory operations
  const memoryAdd = () => {
    const value = parseFloat(result || 0);
    setMemory((prev) => prev + value);
  };

  const memorySubtract = () => {
    const value = parseFloat(result || 0);
    setMemory((prev) => prev - value);
  };

  const memoryRecall = () => {
    setExpression((prev) => prev + memory.toString());
  };

  const memoryClear = () => {
    setMemory(0);
  };

  return (
    <CalculatorContext.Provider
      value={{
        expression,
        result,
        mode,
        angle,
        history,
        memory,
        appendValue,
        clear,
        deleteLast,
        calculate,
        toggleMode,
        toggleAngleMode,
        memoryAdd,
        memorySubtract,
        memoryRecall,
        memoryClear,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export default CalculatorProvider;
