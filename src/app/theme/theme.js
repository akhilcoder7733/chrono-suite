import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#5E60CE",
          },
          background: {
            default: "#F8F9FE",
            paper: "#FFFFFF",
          },
          text: {
            primary: "#1A1A2E",
            secondary: "#6C757D",
          },
        }
      : {
          primary: {
            main: "#7B7EFF",
          },
          background: {
  default: "#0F0F14",
  paper: "#16161F",
},

          text: {
            primary: "#FFFFFF",
            secondary: "#B0B3C7",
          },
        }),
  },
  typography: {
    fontFamily: "Ubuntu, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        transition: "all 0.2s ease",
      },
    },
  },
},

});

export const createAppTheme = (mode) =>
  createTheme(getDesignTokens(mode));
