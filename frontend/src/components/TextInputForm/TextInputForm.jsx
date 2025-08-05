import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function TextInputForm({inputType,handleTextInputChange,handleFormSubmit,handleShowHideClick,handleDescInputChange}) {
  return (
    <form>
      <div>
        <Input
          className="w-full mt-4"
          type={inputType}
          placeholder="Enter a word or phrase"
          aria-label="Enter a word or phrase"
          onChange={handleTextInputChange}
        />
        <Input
          className="w-full mt-4"
          type={inputType}
          placeholder="Enter the Description for the Word"
          aria-label="Enter the Description for the Word"
          onChange={handleDescInputChange}
        />
      </div>

      <div className="w-full mt-4 flex justify-between">
        <Button onClick={handleShowHideClick} variant="destructive">Show</Button>
        <Button onClick={handleFormSubmit}>Submit</Button>
      </div>
    </form>
  );
}

export default TextInputForm;
