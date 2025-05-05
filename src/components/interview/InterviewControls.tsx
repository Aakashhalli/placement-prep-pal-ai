import React from "react";
import { Button } from "@/components/ui/button";
import AudioRecorder from "../AudioRecorder";

interface InterviewControlsProps {
  interviewStarted: boolean;
  readyForReport: boolean;
  isLoading: boolean;
  messagesLength: number;
  onAudioRecordingComplete: (text: string) => void; // Update this to handle text
  onStartInterview: () => void;
  onStopInterview: () => void;
  onViewReport: () => void;
}

const InterviewControls: React.FC<InterviewControlsProps> = ({
  interviewStarted,
  readyForReport,
  isLoading,
  messagesLength,
  onAudioRecordingComplete,
  onStartInterview,
  onStopInterview,
  onViewReport,
}) => {
  return (
    <div className="flex justify-center items-center space-x-6 ">
      {!interviewStarted ? (
        <Button
          onClick={onStartInterview}
          disabled={isLoading}
          className="px-6 py-3 bg-accent-blue text-white rounded-md 
                   hover:bg-accent-blue/90 hover:shadow-md 
                   border-[1.5px] border-transparent hover:border-white 
                   transition-all duration-300 ease-in-out 
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Interview
        </Button>
      ) : (
        <>
          <AudioRecorder
            onRecordingComplete={onAudioRecordingComplete} // Pass the updated function
            isDisabled={isLoading || !interviewStarted}
          />

          {!readyForReport ? (
            <Button
              onClick={onStopInterview}
              disabled={messagesLength < 3 || isLoading}
              className={`
      px-6 py-3 rounded-md text-white font-semibold transition-colors duration-200
      ${
        messagesLength < 3 || isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-red-600 hover:bg-red-700"
      }
    `}
            >
              End Interview
            </Button>
          ) : (
            <Button
              onClick={onViewReport}
              className="px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold 
               transition-colors duration-200"
            >
              View Report
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default InterviewControls;
