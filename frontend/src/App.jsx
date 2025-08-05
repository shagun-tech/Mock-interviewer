import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeProvider } from "./pages/DarkMode/ThemeProvider";

import LandingPage from "./pages/LandingPage";
import RootLayout from "./pages/Navbar/RootLayout";
import HomeContainer from "./pages/Home/HomeContainer";
import EmailVerifyContainer from "./pages/EmailVerify/EmailVerifyContainer";
import ResetPasswordContainer from "./pages/ResetPassword/ResetPasswordContainer";

import { AppContext } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedLayout";
import Loader from "./pages/Loader/Loader";
import DashBoard from "./pages/DashBoardLayout/DashBoard";
import Interview from "./components/interview/Interview";
import StartInterview from "./components/interview/StartInterview";
import FeedbackContainer from "./pages/Feedback/FeedbackContainer";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  const { isLoggedIn, getUserData, loading } = useContext(AppContext);

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) return <Loader />;

  return (
    <ThemeProvider defaultTheme="light">
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={!isLoggedIn ? <LandingPage /> : <Navigate to="/home" replace />}
        />
        <Route path="/reset-password" element={<ResetPasswordContainer />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <RootLayout />
            </ProtectedRoute>
          }
        >
          {/* Email Verification */}
          <Route path="email-verify" element={<EmailVerifyContainer />} />

          {/* Home + Nested Routes */}
          <Route path="home" element={<HomeContainer />}>
            <Route index element={<DashBoard />} /> 
            <Route path="interview/:mockId" element={<Interview />} />
            <Route path="interview/:mockId/start" element={<StartInterview />} />
            <Route path="feedback/:mockId" element={<FeedbackContainer />} />
            <Route path="error" element={<NotFound />} />
          </Route>
        </Route>

        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
