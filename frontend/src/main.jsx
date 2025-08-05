import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import JobProvider from "./context/jobcontext";
import FeedbackProvider from "./context/feedbackcontext";
import { QuestionProvider } from "./context/QuestionContext";

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <JobProvider>
      <QuestionProvider>
        <FeedbackProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FeedbackProvider>
      </QuestionProvider>
    </JobProvider>
  </AppContextProvider>
);
