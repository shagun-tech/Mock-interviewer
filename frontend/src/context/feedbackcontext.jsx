import React, { createContext, useState, useContext } from "react";
import { chatSession } from "@/services/Gemini";
import { dummyFeedback } from "@/config/config";
import { createFeedback, getFeedbackByMockId } from "@/services/services";
import { AppContext } from "./AppContext";

export const FeedbackContext = createContext(null);

export default function FeedbackProvider({ children }) {
  const [jsonFeedback, setJsonFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(dummyFeedback);
  const [averageRating, setAverageRating] = useState(0);

  const { userData } = useContext(AppContext);

  const handleUserAnswer = async (
    mockId,
    question,
    userAnswer,
    correctAnswer
  ) => {
    setLoading(true);
    const feedbackPrompt = `Question: ${question}, User Answer: ${userAnswer}, Depends on question and user answer for given interview question please give us rating for answer and feedback as area of improvement if any. In just 3 to 5 lines to improve it in JSON format with rating field and feedback field.`;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const responseText = await result.response.text();
      const MockJsonResp = responseText
        .replace("```json", "")
        .replace("```", "")
        .trim();
      const parsedResponse = JSON.parse(MockJsonResp);

      // Save feedback to the server
      await createFeedback({
        mockIdRef: mockId,
        question,
        correctAns: correctAnswer,
        userAns: userAnswer,
        feedback: JSON.stringify(parsedResponse?.feedback || []),
        rating: parsedResponse?.rating || 0,
        userEmail: userData?.email,
      });

      setJsonFeedback(parsedResponse);
    } catch (error) {
      console.error("Error while updating feedback:", error);
      alert("An error occurred while updating feedback.");
    } finally {
      setLoading(false);
    }
  };

  const getFeedback = async (mockId) => {
    setLoading(true);
    try {
      const data = await getFeedbackByMockId(mockId);

      if (data.length > 0) {
        const feedbackImprovedData = data.map((answerFeedback) => {
          let parsedFeedback;
          try {
            parsedFeedback = JSON.parse(answerFeedback?.feedback || "[]");
            console.log(parsedFeedback);
          } catch {
            parsedFeedback = [answerFeedback?.feedback || ""];
          }
          return {
            ...answerFeedback,
            feedback: parsedFeedback,
          };
        });

        const sumRating = feedbackImprovedData.reduce(
          (acc, curr) => acc + (curr?.rating || 0),
          0
        );

        setAverageRating(
          feedbackImprovedData.length
            ? sumRating / feedbackImprovedData.length
            : 0
        );
        setFeedback(feedbackImprovedData);
      } else {
        setFeedback([]);
        setAverageRating(0);
      }
    } catch (error) {
      console.error("Error while fetching feedback:", error);
      alert("An error occurred while getting feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FeedbackContext.Provider
      value={{
        jsonFeedback,
        feedback,
        loading,
        averageRating,
        handleUserAnswer,
        getFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
