import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import EmailVerify from "./EmailVerify";
import { useNavigate } from "react-router-dom";

const EmailVerifyContainer = () => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef([]);
  const { getUserData, backendURL } = useContext(AppContext);

  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    e.target.value = value;
    if (value && index < 5) inputRef.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    paste.forEach((digit, i) => {
      if (inputRef.current[i]) {
        inputRef.current[i].value = digit;
      }
    });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += inputRef.current[i]?.value || "";
    }

    try {
      setLoading(true);
      axios.defaults.withCredentials = true;

      const response = await axios.post(`${backendURL}/verify-otp`, { otp });

      if (response?.status === 200) {
        alert("OTP Verified Successfully!");
        getUserData();
      } else {
        alert("Invalid OTP. Try again.");
      }
      setLoading(false);
      navigate(-1);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
      setLoading(false);
    }
  };

  return (
    <EmailVerify
      loading={loading}
      inputRef={inputRef}
      handleChange={handleChange}
      handleKeyDown={handleKeyDown}
      handlePaste={handlePaste}
      handleVerify={handleVerify}
    />
  );
};

export default EmailVerifyContainer;
