import React, { useContext, useRef, useState } from "react";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import ResetPassword from "./ResetPassword";

function ResetPasswordContainer() {
  const [loading, setLoading] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");

  const inputRef = useRef([]);
  const { backendURL } = useContext(AppContext);

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

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      axios.defaults.withCredentials = true;

      const response = await axios.post(
        `${backendURL}/send-reset-otp`,
        {},
        { params: { email } }
      );

      if (response.status === 200) {
        alert("OTP sent to your email.");
        setIsEmailSent(true);
      } else {
        alert("Failed to send OTP.");
      }
    } catch (error) {
      alert("Error sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = inputRef.current.map((input) => input?.value || "").join("");

    if (enteredOtp.length !== 6) {
      alert("Enter 6-digit OTP.");
      return;
    }

    setOtp(enteredOtp);
    setIsOtpSubmitted(true);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axios.post(`${backendURL}/reset-password`, {
        email,
        otp,
        newPassword,
      });

      if (response.status === 200) {
        alert("Password reset successful.");
      } else {
        alert("Failed to reset password.");
      }
    } catch (error) {
      alert("Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResetPassword
      loading={loading}
      email={email}
      setEmail={setEmail}
      otp={otp}
      newPassword={newPassword}
      setNewPassword={setNewPassword}
      isEmailSent={isEmailSent}
      isOtpSubmitted={isOtpSubmitted}
      inputRef={inputRef}
      handleChange={handleChange}
      handleKeyDown={handleKeyDown}
      handlePaste={handlePaste}
      handleEmailSubmit={handleEmailSubmit}
      handleOtpSubmit={handleOtpSubmit}
      handlePasswordSubmit={handlePasswordSubmit}
    />
  );
}

export default ResetPasswordContainer;
