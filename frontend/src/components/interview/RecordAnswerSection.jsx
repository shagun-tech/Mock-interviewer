import React, { useContext, useEffect, useState } from "react";
import Webcam from "react-webcam";
import webcamicon from "../../assets/webcam.svg";
import { Button } from "../ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, AlertCircle, LoaderCircle } from "lucide-react";
import { FeedbackContext } from "@/context/feedbackcontext";

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  mockId,
  userTranscribedAnswer,
  setUserTranscribedAnswer,
}) {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const { jsonFeedback, loading, handleUserAnswer } =
    useContext(FeedbackContext);

  // Append the speech text to the answer
  useEffect(() => {
    console.log("this is result" + results);

    if (results?.length > 0) {
      const newAnswer = results[results.length - 1]?.transcript;
      setUserTranscribedAnswer((prevAns) => prevAns + " " + newAnswer);
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userTranscribedAnswer.length > 10) {
      const question = mockInterviewQuestion[activeQuestionIndex]?.question;
      const correctAnswer = mockInterviewQuestion[activeQuestionIndex]?.answer;

      console.log(question);
      console.log(correctAnswer);

      handleUserAnswer(mockId, question, userTranscribedAnswer, correctAnswer);
      setUserTranscribedAnswer("");
    }
  }, [isRecording]);

  if (error) {
    return (
      <div className="flex items-center justify-center flex-col">
        <div className="flex text-center mt-20 items-center justify-center rounded-lg bg-gray-200 p-5">
          <img src={webcamicon} className="w-56 h-56 absolute" />
          <Webcam
            mirrored={true}
            style={{
              width: "100%",
              height: 300,
              borderRadius: "10px",
              border: "2px solid #ccc",
            }}
          />
        </div>
        <div className="error-message flex items-center text-red-600 p-4 mt-5 rounded-md bg-red-100 border border-red-400">
          <AlertCircle className="mr-2" />
          <span>
            Web Speech API is not supported in Firefox and some other browsers,
            which lack native support for Speech Recognition. It is supported in
            Chrome, Edge, and Opera.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex text-center mt-20 items-center justify-center rounded-lg bg-gray-200 p-5">
        <img src={webcamicon} className="w-56 h-56 absolute" />
        <Webcam
          mirrored={true}
          style={{
            width: "100%",
            height: 300,
            borderRadius: "10px",
            border: "2px solid #ccc",
          }}
        />
      </div>
      <Button
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
        variant="outline"
        className="my-10 dark:border-white"
        disabled={loading}
      >
        {loading ? (
          <>
            <LoaderCircle className="animate-spin" size={16} />
            <b>Getting feedback</b>
          </>
        ) : isRecording ? (
          <span className="text-red-600">
            <Mic /> Stop Recording
          </span>
        ) : (
          "Record Answer"
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
