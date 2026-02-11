import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import { ColorModeContext } from "../../app/theme/ThemeContext";

const navItems = [
  { label: "Timer", path: "/timer" },
  { label: "Stopwatch", path: "/stopwatch" },
  { label: "Countdown", path: "/countdown" },
  { label: "Calendar", path: "/calendar" },
];

/* ===========================
   Styled Components
=========================== */

const NavbarWrapper = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 1000,
  backdropFilter: "blur(14px)",
  background:
    theme.palette.mode === "dark"
      ? "rgba(15,15,20,0.75)"
      : "rgba(255,255,255,0.75)",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const NavbarInner = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: "0 auto",
  padding: "0 32px",
  height: 72,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  [theme.breakpoints.down("md")]: {
    padding: "0 20px",
    height: 64,
  },

  [theme.breakpoints.down("sm")]: {
    padding: "0 16px",
  },
}));

const NavLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 24,

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const DrawerNavButton = styled(Button)(({ theme }) => ({
  justifyContent: "flex-start",
  fontSize: 16,
  fontWeight: 500,
  padding: "12px 16px 12px 20px",
  borderRadius: 14,
  textTransform: "none",
  color: theme.palette.text.primary,
  position: "relative",
  transition: "0.2s",

  // Subtle hover
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },

  // Active route
  "&.active": {
    fontWeight: 600,
  },

  // Left accent indicator
  "&.active::before": {
    content: '""',
    position: "absolute",
    left: 8,
    top: "50%",
    transform: "translateY(-50%)",
    width: 4,
    height: 18,
    borderRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));


const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",

  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
}));

const DrawerOverlay = styled(motion.div)(({ theme }) => ({
  position: "fixed",
  inset: 0,
  background:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.3)",
  backdropFilter: "blur(6px)",
  zIndex: 1300,
}));

const DrawerPanel = styled(motion.div)(({ theme }) => ({
  position: "fixed",
  top: 0,
  right: 0,
  height: "100vh",
  width: 320,
  padding: "40px 28px",
  display: "flex",
  flexDirection: "column",
  gap: 32,
  backdropFilter: "blur(30px)",
  background:
    theme.palette.mode === "dark"
      ? "rgba(22,22,28,0.85)"
      : "rgba(255,255,255,0.85)",
  borderLeft: `1px solid ${theme.palette.divider}`,
  zIndex: 1400,

  [theme.breakpoints.down("sm")]: {
    width: "85%",
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const AppTitle = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  fontWeight: 600,
  letterSpacing: 0.5,
}));

const NavSection = styled(motion.div)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  marginTop: 20,
}));

const ThemeSection = styled(Box)(({ theme }) => ({
  marginTop: "auto",
  paddingTop: 24,
}));

const ThemeToggleGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: 4,
  borderRadius: 999,
  backgroundColor: theme.palette.action.hover,
}));

const ThemeButton = styled(Button)(({ theme, active }) => ({
  flex: 1,
  borderRadius: 999,
  textTransform: "none",
  fontWeight: 500,
  padding: "8px 0",
  fontSize: 14,
  transition: "0.2s",
  backgroundColor: active ? theme.palette.background.paper : "transparent",
  color: theme.palette.text.primary,

  "&:hover": {
    backgroundColor: active
      ? theme.palette.background.paper
      : theme.palette.action.selected,
  },
}));

/* ===========================
   Component
=========================== */

const Navbar = () => {
  const { toggleColorMode } = useContext(ColorModeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  return (
    <>
      <NavbarWrapper>
        <NavbarInner>
          <Typography variant="h6" fontWeight={700}>
            Chrono Suite
          </Typography>

          <NavLinks>
            {navItems.map((item) => (
              <DrawerNavButton
                key={item.path}
                component={NavLink}
                to={item.path}
              >
                {item.label}
              </DrawerNavButton>
            ))}

            <IconButton onClick={toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>
          </NavLinks>

          {isMobile && (
            <MobileMenuButton onClick={() => setOpen(true)}>
              <MenuIcon />
            </MobileMenuButton>
          )}
        </NavbarInner>
      </NavbarWrapper>

      {/* ===========================
          Framer Motion Drawer
      ============================ */}

      <AnimatePresence>
        {open && (
          <>
            <DrawerOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <DrawerPanel
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header */}
              <DrawerHeader>
                <AppTitle>Chrono Suite</AppTitle>
                <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </DrawerHeader>

              {/* Navigation */}
              <NavSection
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.05 },
                  },
                }}
              >
                {navItems.map((item) => (
                  <DrawerNavButton
                    key={item.path}
                    component={NavLink}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    sx={{ justifyContent: "flex-start" }}
                  >
                    {item.label}
                  </DrawerNavButton>
                ))}
              </NavSection>

              {/* Theme Selector */}
              <ThemeSection>
                <Typography variant="body2" sx={{ mb: 1, opacity: 0.7 }}>
                  Appearance
                </Typography>

                <ThemeToggleGroup>
                  <ThemeButton
                    startIcon={<LightModeIcon />}
                    active={theme.palette.mode === "light"}
                    onClick={() =>
                      theme.palette.mode !== "light" && toggleColorMode()
                    }
                  >
                    Light
                  </ThemeButton>

                  <ThemeButton
                    startIcon={<DarkModeIcon />}
                    active={theme.palette.mode === "dark"}
                    onClick={() =>
                      theme.palette.mode !== "dark" && toggleColorMode()
                    }
                  >
                    Dark
                  </ThemeButton>
                </ThemeToggleGroup>
              </ThemeSection>
            </DrawerPanel>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
