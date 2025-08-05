import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";
import { Textarea } from "../ui/textarea"; // use Textarea from shadcn/ui

function QuestionSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  setActiveQuestionIndex,
  userTranscribedAnswer,
}) {
  function textToSpeech(text) {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, your browser doesn’t support Text-to-Speech');
    }
  }

  return (
    mockInterviewQuestion &&
    mockInterviewQuestion.length > 0 && (
      <div className="p-5 border rounded-lg mt-20 dark:border-white">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockInterviewQuestion.map((question, index) => (
            <h2
              key={index}
              onClick={() => setActiveQuestionIndex(index)}
              className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activeQuestionIndex === index
                  ? "border dark:border-white border-black font-bold dark:bg-gray-700"
                  : ""
              }`}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>

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

        <Textarea
          className="rounded-lg h-20 mt-2 border dark:border-white"
          disabled
          value={userTranscribedAnswer || ""}
        />

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
