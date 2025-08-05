import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function InterviewItemCard({ interview }) {

  

  return (
    <div className="border shadow-lg rounded-lg p-3 hover:shadow-2xl hover:border-gray-300 dark:border-white">
      <h2 className="font-bold text-primary">
        {interview?.jobPosition || "Unknown Position"}
      </h2>

      <h2 className="text-sm text-gray-600">
        {`${interview?.jobExperience || 0} Experience`}
      </h2>

      <h2 className="text-xs text-gray-400">
        Created At:{" "}
        {new Date(interview?.createdAt).toLocaleDateString() || "N/A"}
      </h2>

      <div className="flex justify-end mt-2 gap-5">
        <Link to={`/home/feedback/${interview?.mockId || ""}`}>
          <Button
            size="sm"
            variant="outline"
            className="w-full border rounded dark:bg-white dark:text-black"
          >
            Feedback
          </Button>
        </Link>

        <Link to={`/home/interview/${interview?.mockId || ""}`}>
          <Button
            size="sm"
            className="w-full bg-blue-500 text-white rounded "
          >
            Start
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewItemCard;
