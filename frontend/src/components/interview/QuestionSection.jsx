import { Lightbulb, Volume2 } from "lucide-react";
import React, { useEffect, useContext } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { QuestionContext } from "@/context/QuestionContext";

function QuestionSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  setActiveQuestionIndex,
  userTranscribedAnswer,
  setUserTranscribedAnswer,
}) {
  const { questionColor, setQuestionColor } = useContext(QuestionContext);

  function textToSpeech(text) {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser doesn’t support Text-to-Speech");
    }
  }

  // Initialize question colors
  useEffect(() => {
    if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) return;

    let colorMap = {};
    mockInterviewQuestion.forEach((_, index) => {
      colorMap[index] = false;
    });

    setQuestionColor(colorMap);
  }, [mockInterviewQuestion]);

  return (
    mockInterviewQuestion &&
    mockInterviewQuestion.length > 0 && (
      <div className="p-5 border rounded-lg mt-20 dark:border-white">
        {/* Question Number Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockInterviewQuestion.map((_, index) => (
            <h2
              key={index}
              onClick={() => setActiveQuestionIndex(index)}
              className={`p-2 bg-secondary rounded-full ${
                questionColor[index] ? "bg-green-500" : "dark:bg-gray-700"
              } text-xs md:text-sm text-center cursor-pointer ${
                activeQuestionIndex === index
                  ? "border dark:border-white border-black font-bold "
                  : ""
              }`}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>

        {/* Active Question */}
        <h2 className="my-5 text-md md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>

        <Volume2
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
          className="cursor-pointer text-blue-500 hover:text-blue-700"
          title="Read Question Aloud"
        />

        {/* Answer Box */}
        <Textarea
          className="rounded-lg h-14 mt-2 border border-gray-500 dark:border-white"
          disabled
          value={userTranscribedAnswer || ""}
        />
        <Button
          className="h-5 mt-2"
          onClick={() => setUserTranscribedAnswer("")}
        >
          Clear
        </Button>

        {/* Notes Section */}
        <div className="border rounded-lg p-5 bg-blue-100 mt-2 dark:bg-gray-700">
          <h2 className="flex gap-2 items-center text-blue-700 dark:text-white">
            <Lightbulb />
            <strong>Note</strong>
          </h2>
          <h2>Provide relevant notes or instructions here</h2>
        </div>
      </div>
    )
  );
}

export default QuestionSection;
