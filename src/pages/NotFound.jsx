import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

const Root = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
}));

const Card = styled(MotionBox)(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  padding: theme.spacing(5),
  borderRadius: 28,
  textAlign: "center",
  backdropFilter: "blur(20px)",
  background:
    theme.palette.mode === "dark"
      ? "rgba(30,30,40,0.6)"
      : "rgba(255,255,255,0.7)",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 10px 40px rgba(0,0,0,0.5)"
      : "0 10px 40px rgba(0,0,0,0.1)",
}));

const BigNumber = styled(Typography)(({ theme }) => ({
  fontSize: "6rem",
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: 2,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Root>
      <Card
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <BigNumber>404</BigNumber>
        </motion.div>

        <Typography
          variant="h5"
          sx={{ mt: 2, fontWeight: 600 }}
        >
          Page Not Found
        </Typography>

        <Typography
          variant="body2"
          sx={{ mt: 1, opacity: 0.7 }}
        >
          The page you’re looking for doesn’t exist or has been moved.
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 4,
            borderRadius: 20,
            textTransform: "none",
            px: 4,
          }}
          onClick={() => navigate("/timer")}
        >
          Back to Timer
        </Button>
      </Card>
    </Root>
  );
};

export default NotFound;
