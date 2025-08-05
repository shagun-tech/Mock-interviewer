import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignUp = ({
  name,
  email,
  password,
  nameError,
  emailError,
  passwordError,
  formError,
  loading,
  handleNameChange,
  handleEmailChange,
  handlePasswordChange,
  handleFormSubmit,
  toggleForm
}) => {
  return (
    <div className="w-full max-w-md rounded-lg border bg-white dark:bg-black dark:border-white xs:h-auto xs:w-96">
      <div className="px-6 py-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">Sign Up</h2>

        {formError && <div className="mt-4 text-red-500">{formError}</div>}

        <form onSubmit={handleFormSubmit}>
          <div className="mt-4">
            <Input
              className="w-full mt-2"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={handleNameChange}
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}

            <Input
              className="w-full mt-2"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

            <Input
              className="w-full mt-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          </div>

          <Button className="w-full mt-4 font-medium" variant="default" type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <button onClick={toggleForm} className="font-medium text-blue-500 dark:text-gray-100 hover:underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
