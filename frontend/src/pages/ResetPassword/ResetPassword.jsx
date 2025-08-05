import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ResetPassword({
  loading,
  email,
  setEmail,
  newPassword,
  setNewPassword,
  isEmailSent,
  isOtpSubmitted,
  inputRef,
  handleChange,
  handleKeyDown,
  handlePaste,
  handleEmailSubmit,
  handleOtpSubmit,
  handlePasswordSubmit,
}) {
  return (
    <div className="flex flex-col items-center justify-center pattern min-h-screen p-4">
      {!isEmailSent && (
        <div className="bg-white dark:bg-black border dark:border-white shadow-xl p-8 md:p-10 rounded-2xl w-full max-w-xl">
          <h4 className="text-xl font-semibold mb-2 text-center text-gray-900 dark:text-gray-100">
            Reset Password
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
            Enter your registered email address
          </p>
          <form onSubmit={handleEmailSubmit}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="mb-6 "
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        </div>
      )}

      {isEmailSent && !isOtpSubmitted && (
        <div className="bg-white dark:bg-black border dark:border-white shadow-xl p-8 md:p-10 rounded-2xl w-full max-w-xl mt-4">
          <h4 className="text-xl font-semibold mb-2 text-center text-gray-900 dark:text-gray-100">
            Enter OTP
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
            Enter the 6-digit OTP sent to your email
          </p>
          <form onSubmit={handleOtpSubmit}>
            <div className="flex justify-between gap-2 mb-6" onPaste={handlePaste}>
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  autoComplete="off"
                  ref={(el) => (inputRef.current[i] = el)}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-12 h-12 text-center text-xl border border-gray-300 dark:border-gray-700 rounded-lg shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-white"
                />
              ))}
            </div>
            <Button type="submit" className="w-full">
              Verify OTP
            </Button>
          </form>
        </div>
      )}

      {isEmailSent && isOtpSubmitted && (
        <div className="bg-white dark:bg-black border dark:border-white shadow-xl p-8 md:p-10 rounded-2xl w-full max-w-xl mt-4">
          <h4 className="text-xl font-semibold mb-2 text-center text-gray-900 dark:text-gray-100">
            Set New Password
          </h4>
          <form onSubmit={handlePasswordSubmit}>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              required
              className="mb-6"
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
