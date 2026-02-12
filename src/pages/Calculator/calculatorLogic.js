import { create, all } from "mathjs";

const math = create(all, {
  number: "BigNumber",      // Prevent floating precision issues
  precision: 32,            // High precision
});

// Optional: Configure angle mode dynamically later
let angleMode = "deg"; // default

export const setAngleMode = (mode) => {
  angleMode = mode;
  math.config({
    number: "BigNumber",
    precision: 32,
  });
};

const preprocessExpression = (expression) => {
  if (!expression) return "";

  let exp = expression;

  // Replace UI-friendly symbols
  exp = exp.replace(/×/g, "*");
  exp = exp.replace(/÷/g, "/");
  exp = exp.replace(/π/g, "pi");
  exp = exp.replace(/√/g, "sqrt");
  exp = exp.replace(/%/g, "/100");

  if (angleMode === "deg") {
    exp = exp.replace(/sin\((.*?)\)/g, "sin(($1) * pi / 180)");
    exp = exp.replace(/cos\((.*?)\)/g, "cos(($1) * pi / 180)");
    exp = exp.replace(/tan\((.*?)\)/g, "tan(($1) * pi / 180)");
  }

  return exp;
};

export const evaluateExpression = (expression) => {
  try {
    const processed = preprocessExpression(expression);
    const result = math.evaluate(processed);

    if (!result) return "";

    return formatResult(result);
  } catch (err) {
    return "Error";
  }
};

const formatResult = (value) => {
  if (!value) return "";

  const stringValue = value.toString();

  if (stringValue.length > 14) {
    return Number(stringValue).toExponential(6);
  }

  return stringValue;
};
