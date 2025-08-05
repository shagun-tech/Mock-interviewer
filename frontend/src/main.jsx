import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import JobProvider from "./context/jobcontext";
import FeedbackProvider from "./context/feedbackcontext";

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <JobProvider>
      <FeedbackProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </FeedbackProvider>
    </JobProvider>
  </AppContextProvider>
);
