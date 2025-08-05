import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignUp from "./SignUp";
import { AppContext } from "../../context/AppContext";

const SignUpContainer = ({ toggleForm }) => {
  const navigate = useNavigate();
  const { backendURL } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError(value.length < 2 ? "Name must be at least 2 characters." : "");
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(emailRegex.test(value) ? "" : "Please enter a valid email address.");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(passwordRegex.test(value) ? "" : "Must be 8+ chars, with a letter & number.");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log(name);
    console.log(email);
    console.log(password);

    if (!name || !email || !password) {
      setFormError("Please fill in all fields.");
      return;
    }

    if (nameError || emailError || passwordError) {
      setFormError("Please fix the errors before submitting.");
      return;
    }

    setFormError("");
    setLoading(true);

    try {
      const response = await axios.post(`${backendURL}/register`, {
        name,
        email,
        password
      });

      console.log(response);

      if (response?.request?.status === 201) {
        alert("User signed up successfully! You can now log in.");
        toggleForm();
      } else {
        setFormError("Something went wrong. Try again.");
      }
    } catch (error) {
      setFormError(error.response?.data?.message || "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignUp
      name={name}
      email={email}
      password={password}
      nameError={nameError}
      emailError={emailError}
      passwordError={passwordError}
      formError={formError}
      loading={loading}
      handleNameChange={handleNameChange}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleFormSubmit={handleFormSubmit}
      toggleForm={toggleForm}
    />
  );
};

export default SignUpContainer;
