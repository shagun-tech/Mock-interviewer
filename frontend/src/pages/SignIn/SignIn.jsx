import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const SignIn = ({
  email,
  password,
  emailError,
  passwordError,
  formError,
  loading,
  handleEmailChange,
  handlePasswordChange,
  handleFormSubmit,
  toggleForm,
}) => {
  return (
    <div className="w-full max-w-md rounded-lg xs:h-80 xs:w-96 bg-white border dark:bg-black dark:border-white">
      <div className="px-6 py-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">Sign In</h2>

        {formError && <div className="mt-4 text-red-500">{formError}</div>}

        <form onSubmit={handleFormSubmit}>
          <div className="mt-4">
            <Input
              className="w-full mt-2"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

            <Input
              className="w-full mt-4"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          <div className="flex items-center justify-between mt-4">
            <Link to="/reset-password" className="text-sm text-gray-600 dark:text-gray-200 hover:underline">
              Forget Password?
            </Link>

            <Button type="submit" variant="default" className="px-6 py-2 font-medium" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <button onClick={toggleForm} className="font-medium text-blue-500 dark:text-gray-100 hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
