import { initialDialogFormData } from "@/config/config";
import { createContext, useContext, useEffect, useState } from "react";
import { chatSession } from "@/services/Gemini";
import { createInterview, fetchInterviewById } from "@/services/services";
import { AppContext } from "./AppContext";

export const JobContext = createContext();

export default function JobProvider({ children }) {
  const [dialogFormData, setDialogFormData] = useState(initialDialogFormData);
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState(() => {
    const savedResponse = localStorage.getItem("jsonResponse");
    return savedResponse ? JSON.parse(savedResponse) : {};
  });

  const {userData} = useContext(AppContext);

  useEffect(() => {
    localStorage.setItem("jsonResponse", JSON.stringify(jsonResponse));
  }, [jsonResponse]);

  // Handle Interview Creation
  const handleDialogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { jobRole, jobDescription, jobExperience } = dialogFormData;
    const QuestionCount = 5;
    const InputPrompt = `Job Position: ${jobRole}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}. Generate ${QuestionCount} interview questions with answers in JSON format , keep in mind the key of the question's answer should be "answer" and the question's key should be "question".`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const raw = await result.response.text();
      const cleaned = raw.replace(/```json|```/g, "").trim();

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(cleaned);
      } catch {
        setJsonResponse({ error: "Failed to parse response." });
        return { success: false };
      }

      const formData = {
        jsonMockResp: parsedResponse,
        jobPosition: jobRole,
        jobDescription,
        jobExperience,
        createdBy: userData?.email,
      };


      const data = await createInterview(formData);

      setJsonResponse(data);
      return { success: true, data };
    } catch (error) {
      console.error("Error during submission:", error);
      return { success: false, error: "Failed to submit data." };
    } finally {
      setLoading(false);
    }
  };

  // Fetch Interview by ID
  const fetchInterview = async (mockId) => {
    try {
      setLoading(true);
      const response = await fetchInterviewById(mockId);

      if (response?.success && response?.data) {
        setJsonResponse(response);
        return response.data;
      }
      return response;
    } catch (error) {
      console.error("Error fetching interview:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <JobContext.Provider
      value={{
        dialogFormData,
        setDialogFormData,
        handleDialogSubmit,
        loading,
        jsonResponse,
        setJsonResponse,
        fetchInterview,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}
