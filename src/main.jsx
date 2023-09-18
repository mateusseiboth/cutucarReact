import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/inter";
import routes, { renderRoutes } from "./routes/main";
import { grey } from "@mui/material/colors";
import { BrowserRouter as Router } from "react-router-dom";
const BASENAME = "";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router basename={BASENAME}>{renderRoutes(routes)}</Router>
  </React.StrictMode>
);
