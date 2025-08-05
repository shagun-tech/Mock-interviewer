import React, { useState } from "react";
import TextInputForm from "./TextInputForm";
import { useNavigate } from "react-router-dom";

function TextInputFormContainer() {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [inputType, setInputType] = useState("password");

  const navigate = useNavigate();

  function handleTextInputChange(event) {
    setInput(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (input && description) {
      // if we have something in value then we want to go to the play page
      navigate(`/play`, {
        state: { wordSelected: input, wordDescription: description },
      });
    }
  }

  function handleShowHideClick(event) {
    event.preventDefault();
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  }

  function handleDescInputChange(event) {
    setDescription(event.target.value);
  }

  return (
    <TextInputForm
      inputType={inputType}
      handleTextInputChange={handleTextInputChange}
      handleFormSubmit={handleFormSubmit}
      handleShowHideClick={handleShowHideClick}
      handleDescInputChange={handleDescInputChange}
    />
  );
}

export default TextInputFormContainer;
