import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
   palette: {
      mode: "light",
      primary: {
         main: "#4F46E5",
         light: "#6366F1",
         dark: "#3730A3",
         contrastText: "#FFFFFF",
      },
      secondary: {
         main: "#3B82F6",
         light: "#60A5FA",
         dark: "#1D4ED8",
         contrastText: "#FFFFFF",
      },
      background: {
         default: "#F9FAFB",
         paper: "#FFFFFF",
      },
      text: {
         primary: "#111827",
         secondary: "#6B7280",
      },
      error: {
         main: "#EF4444",
      },
      success: {
         main: "#10B981",
      },
      warning: {
         main: "#F59E0B",
      },
      info: {
         main: "#6366F1",
      },
   },
   typography: {
      fontFamily: "'Roboto', sans-serif",
      h1: { fontWeight: 700, fontSize: "2.25rem" },
      h2: { fontWeight: 700, fontSize: "1.875rem" },
      h4: { fontWeight: 700 },
      button: { textTransform: "none", fontWeight: 600 },
   },
   components: {
      MuiPaper: {
         styleOverrides: {
            root: {
               borderRadius: 12,
            },
         },
      },
      MuiButton: {
         styleOverrides: {
            root: {
               borderRadius: 8,
               padding: "10px 16px",
            },
         },
      },
      MuiTextField: {
         styleOverrides: {
            root: {
               marginTop: 14,
               marginBottom: 14,
            },
         },
      },
   },
});
