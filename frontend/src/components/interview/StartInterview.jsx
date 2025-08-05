import React, { useState, useEffect, useContext } from "react";
import { Lightbulb } from "lucide-react";
import QuestionSection from "./QuestionSection";
import RecordAnswerSection from "./RecordAnswerSection";
import { Button } from "../ui/button";
import { JobContext } from "@/context/jobcontext";
import { useNavigate } from "react-router-dom";
import NoDataPresent from "@/pages/NotFound/NoDataPresent";

export default function StartInterview() {
  const { jsonResponse, setJsonResponse } = useContext(JobContext);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userTranscribedAnswer,setUserTranscribedAnswer] = useState("");
  const navigate = useNavigate();

  const interviewData = jsonResponse;


  const handleEndInterview = () => {
    localStorage.removeItem("jsonResponse");
    setJsonResponse({});
    navigate(`/home/feedback/${interviewData?.mockId}`);
  };

  useEffect(() => {
    if (interviewData?.jsonMockResp) {
      setMockInterviewQuestion(
        Array.isArray(interviewData.jsonMockResp) ? interviewData.jsonMockResp : []
      );
    }
  }, [interviewData]);

  if (!interviewData) {
    return (
      <NoDataPresent
        message={"No interview data available. Please start a new interview."}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
          userTranscribedAnswer={userTranscribedAnswer}
          setUserTranscribedAnswer={setUserTranscribedAnswer}
        />

        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          mockId={interviewData.mockId}
          userTranscribedAnswer={userTranscribedAnswer}
          setUserTranscribedAnswer={setUserTranscribedAnswer}
        />
      </div>

      <div className="flex justify-end gap-6 mt-4">
        {activeQuestionIndex > 0 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
            Previous Question
          </Button>
        )}
        {activeQuestionIndex < mockInterviewQuestion.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion.length - 1 && (
          <Button onClick={handleEndInterview}>End Interview</Button>
        )}
      </div>
    </>
  );
}