import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import "./index.css";
import { theme } from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <HelmetProvider>
         <BrowserRouter>
            <ThemeProvider theme={theme}>
               <CssBaseline />
               <App />
            </ThemeProvider>
         </BrowserRouter>
      </HelmetProvider>
   </React.StrictMode>,
);
