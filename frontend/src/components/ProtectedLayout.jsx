import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loader from "../pages/Loader/Loader";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AppContext);

  if (loading) return <Loader />;
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
