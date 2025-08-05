import React from "react";
import { Button } from "../ui/button";
import FormControls from "./FormControls";
import { LoaderCircle } from "lucide-react";

function CommonForm({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = false,
  loading = false,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button
        disabled={isButtonDisabled || loading}
        className="mt-4 w-full flex justify-center items-center"
        type="submit"
      >
        {loading ? (
          <>
            <LoaderCircle className="animate-spin" size={16} />
            <b>Generating from AI</b>
          </>
        ) : (
          buttonText || "Submit"
        )}
      </Button>
    </form>
  );
}


export default CommonForm;
