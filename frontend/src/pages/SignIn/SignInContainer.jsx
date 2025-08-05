import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import { AppContext } from "../../context/AppContext";

const SignInContainer = ({ toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendURL, setIsLoggedIn, setUserData , getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    setEmailError(emailRegex.test(val) ? "" : "Please enter a valid email address.");
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setPasswordError(passwordRegex.test(val)
      ? ""
      : "Password must be at least 8 characters long and contain at least one letter and one number."
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    if (emailError || passwordError || !email || !password) {
      setFormError("Please fill in the fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${backendURL}/login`, { email, password });

      if (response?.request?.status === 200) {
        setIsLoggedIn(true);
        setUserData(response.data);
        navigate("/home");
      } else {
        setFormError("Invalid email or password.");
      }
    } catch (error) {
      setFormError(error.response?.data?.message || "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignIn
      email={email}
      password={password}
      emailError={emailError}
      passwordError={passwordError}
      formError={formError}
      loading={loading}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleFormSubmit={handleFormSubmit}
      toggleForm={toggleForm}
    />
  );
};

export default SignInContainer;
