import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import reportWebVitals from "./reportWebVitals";
import AppRoutes from "./routes";
import { Theme } from "./utils/theme-config";
import Loader from "./core/loader";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppProvide } from "./utils/context";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.scss";

const theme = createTheme(Theme);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Loader />
      <ToastContainer autoClose={8000} />
      <AppProvide>
        <AppRoutes />
      </AppProvide>
    </ThemeProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
