import React from "react";

const EmailVerify = ({
  loading,
  inputRef,
  handleChange,
  handleKeyDown,
  handlePaste,
  handleVerify,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gradient-to-b dark:from-black dark:to-gray-800 transition-colors duration-300">
      <div className="bg-white container dark:bg-black border dark:border-white shadow-xl p-8 md:p-10 rounded-2xl w-full max-w-xl">
        <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 text-center">
          Email Verification
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
          Enter the six-digit OTP sent to your email
        </p>
        <form autoComplete="off" onSubmit={handleVerify}>
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
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;
