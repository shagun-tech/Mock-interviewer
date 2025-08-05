import React, { createContext, useState } from "react";

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [questionColor, setQuestionColor] = useState({});

  const markQuestionAsAnswered = (index) => {
    setQuestionColor((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  return (
    <QuestionContext.Provider
      value={{ questionColor, setQuestionColor, markQuestionAsAnswered }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
