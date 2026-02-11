import { Box, useTheme } from "@mui/material";

const ProgressRing = ({ progress, size = 260, strokeWidth = 10 }) => {
  const theme = useTheme();

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <Box
      sx={{
        position: "relative",
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size}>
        {/* Background Circle */}
        <circle
          stroke={theme.palette.action.disabledBackground}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* Progress Circle */}
        <circle
          stroke={theme.palette.primary.main}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transition: "stroke-dashoffset 0.25s linear",
          }}
        />
      </svg>
    </Box>
  );
};

export default ProgressRing;
