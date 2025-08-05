import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "../ui/button";
import { JobContext } from "@/context/jobcontext";
import { useNavigate, useParams } from "react-router-dom";


export default function Interview() {
  const { fetchInterview } = useContext(JobContext);
  const { mockId } = useParams();
  const navigate = useNavigate();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [interviewData, setInterviewData] = useState({});

  useEffect(() => {
    async function handleGetInterview() {
      const data = await fetchInterview(mockId);
      setInterviewData(data || {});
    }
    if (mockId) handleGetInterview();
  }, [mockId]);

  return (
    <div className="my-10 flex flex-col items-center">
      <h2 className="font-bold text-2xl mb-5">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
        {/* Job Info */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5 mt-5">
            <h2>
              <strong>Job Role:</strong> {interviewData?.jobPosition || "Loading..."}
            </h2>
            <h2>
              <strong>Job Description:</strong> {interviewData?.jobDescription || "Loading..."}
            </h2>
            <h2>
              <strong>Experience Required:</strong> {interviewData?.jobExperience || "Loading..."}
            </h2>
          </div>

          {/* Info Box */}
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-200">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-600">
              Ensure you're in a quiet place with good lighting before starting your interview.
            </h2>
          </div>
        </div>

        {/* Webcam Section */}
        <div className="flex flex-col items-center w-full">
          {webCamEnabled ? (
            <Webcam
              mirrored
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                border: "2px solid #ccc",
              }}
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => {
                setWebCamEnabled(false);
                alert("Failed to access webcam or microphone. Please try again.");
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-48 w-full my-5 p-10 bg-gray-300 rounded-lg border" />
              <Button variant="ghost" onClick={() => setWebCamEnabled(true)}>
                Enable Webcam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end w-full max-w-4xl mt-10">
        <Button onClick={() => navigate(`/home/interview/${mockId}/start`)}>
          Start Interview
        </Button>
      </div>
    </div>
  );
}
