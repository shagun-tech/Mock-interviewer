import Feedback from "@/components/feedback/Feedback";
import { FeedbackContext } from "@/context/feedbackcontext";
import React, { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import NoDataPresent from "../NotFound/NoDataPresent";

function FeedbackContainer() {
  const { feedback, getFeedback , averageRating } = useContext(FeedbackContext);

  const { mockId } = useParams();

  async function handleGetInterview() {
    await getFeedback(mockId);
  }

  useEffect(() => {
    handleGetInterview();
  }, [mockId]);

  if (!feedback || feedback.length === 0) {
    return <NoDataPresent message="No Feedback found for the given mockId." />;
  }

  return (
    <>
      <Feedback feedbacklist={feedback} averageRating={averageRating} />
    </>
  );
}

export default FeedbackContainer;
