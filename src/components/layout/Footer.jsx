import React from "react";
import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const FooterWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  backdropFilter: "blur(14px)",
  background:
    theme.palette.mode === "dark"
      ? "rgba(15,15,20,0.75)"
      : "rgba(255,255,255,0.75)",
  padding: "20px 24px",
  overflow: "hidden",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "200%",
    height: 2,
    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(90deg, #7f5af0, #2cb67d, #ef4565, #7f5af0)"
        : "linear-gradient(90deg, #6366f1, #06b6d4, #f43f5e, #6366f1)",
    backgroundSize: "200% 100%",
    animation: "gradientMove 6s linear infinite",
  },

  "@keyframes gradientMove": {
    "0%": { backgroundPosition: "0% 50%" },
    "100%": { backgroundPosition: "100% 50%" },
  },
}));


const FooterInner = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: 8,
  alignItems: "center",
  textAlign: "center",

  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "left",
  },
}));

const Footer = () => {
  return (
    <FooterWrapper
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <FooterInner>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          © {new Date().getFullYear()} Chrono Suite by TerminalWizard
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.5 }}>
          Built with React · MUI · Framer Motion
        </Typography>
      </FooterInner>
    </FooterWrapper>
  );
};

export default Footer;
