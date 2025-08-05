import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const useHandleLogout = () => {
  const { backendURL, setIsLoggedIn, setUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${backendURL}/logout`);

      if (response.status === 200) {
        setIsLoggedIn(false);
        setUserData(null);
        navigate("/");
      } else {
        console.error("Logout failed with status:", response.status);
      }
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  }, [backendURL, setIsLoggedIn, setUserData, navigate]);

  return handleLogout;
};

export default useHandleLogout;
